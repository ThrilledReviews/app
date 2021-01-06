import { initializeApp } from 'firebase-admin';
import { https, Response, config } from 'firebase-functions';
import { Twilio, twiml } from 'twilio';

const admin = initializeApp();
const firestore = admin.firestore();

export const handleTextResponse = async (req: https.Request, res: Response) => {
  res.set('Access-Control-Allow-Origin', '*');
  const response: string = req.body.Body;
  const to: string = req.body.To;
  const from: string = req.body.From;

  const twimlResponse = new twiml.MessagingResponse();

  const userDoc = (
    await firestore.collection('users').where('phoneNumber', '==', to).limit(1).get()
  ).docs[0];
  const reviewUrl = userDoc.get('reviewUrl');
  const fiveStarResponse = userDoc.get('fiveStarResponse');
  const oneToFourStarResponse = userDoc.get('oneToFourStarResponse');
  const invalidInputResponse = userDoc.get('invalidInputResponse');
  const alreadyAnsweredResponse = userDoc.get('alreadyAnsweredResponse');
  const notificationPhoneNumber = userDoc.get('notificationPhoneNumber');
  const notificationsEnabled: boolean = userDoc.get('notificationsEnabled');
  const phoneNumber = userDoc.get('phoneNumber');

  const feedbackRequestDoc = (
    await firestore
      .collection('users')
      .doc(userDoc.id)
      .collection('feedbackRequests')
      .where('phoneNumber', '==', from)
      .orderBy('createdDate', 'desc')
      .limit(1)
      .get()
  ).docs[0];

  if (!feedbackRequestDoc) {
    res.writeHead(204, 'No Feedback Request Matching This #');
    res.end();
    return;
  }

  if (feedbackRequestDoc.data().resultNumber !== -1) {
    twimlResponse.message(alreadyAnsweredResponse);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twimlResponse.toString());
    return;
  }

  if (response === '1' || response === '2' || response === '3' || response === '4') {
    if (notificationsEnabled) {
      const client = new Twilio(config().twilio.sid, config().twilio.token);
      await client.messages.create({
        to: notificationPhoneNumber,
        from: phoneNumber,
        body: `${response} Star Feedback Recieved from ${feedbackRequestDoc.data().customerName}
The customer's phone number is ${feedbackRequestDoc.data().phoneNumber}`,
      });
    }
    await feedbackRequestDoc.ref.set(
      {
        resultNumber: Number(response),
      },
      { merge: true }
    );

    twimlResponse.message(oneToFourStarResponse);

    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twimlResponse.toString());
    }, 10000);
  } else if (response === '5') {
    await feedbackRequestDoc.ref.set({ resultNumber: Number(response) }, { merge: true });
    twimlResponse.message(`${fiveStarResponse}

https://us-central1-thrill-check.cloudfunctions.net/redirect?b=${userDoc.id}&c=${feedbackRequestDoc.id}`);

    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twimlResponse.toString());
    }, 10000);
  } else {
    twimlResponse.message(invalidInputResponse);

    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twimlResponse.toString());
    }, 10000);
  }
};
