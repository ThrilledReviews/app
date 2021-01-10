import { https, Response, config } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { Twilio, twiml } from 'twilio';

export const handleTextResponse = async (req: https.Request, res: Response) => {
  res.set('Access-Control-Allow-Origin', '*');
  const response: string = req.body.Body;
  const to: string = req.body.To;
  const from: string = req.body.From;

  const twimlResponse = new twiml.MessagingResponse();

  const userDoc = (await firestore().collection('users').where('appPhone', '==', to).limit(1).get())
    .docs[0];

  const fiveStarResponse: string = userDoc.get('fiveStarResponse');
  const oneToFourStarResponse: string = userDoc.get('oneToFourStarResponse');
  const invalidInputResponse: string = userDoc.get('invalidInputResponse');
  const alreadyAnsweredResponse: string = userDoc.get('alreadyAnsweredResponse');
  const notificationPhoneNumber: string = userDoc.get('notificationPhoneNumber');
  const notificationsEnabled: boolean = userDoc.get('notificationsEnabled');
  const appPhone: string = userDoc.get('appPhone');

  const feedbackRequestDoc = (
    await firestore()
      .collection('users')
      .doc(userDoc.id)
      .collection('feedbackRequests')
      .where('customerPhone', '==', from)
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
    let event;
    let eventName;
    if (response === '1') {
      event = 'one_star_review';
      eventName = 'One Star Review';
    }
    if (response === '2') {
      event = 'two_star_review';
      eventName = 'Two Star Review';
    }
    if (response === '3') {
      event = 'three_star_review';
      eventName = 'Three Star Review';
    }
    if (response === '4') {
      event = 'four_star_review';
      eventName = 'Four Star Review';
    }
    await firestore()
      .collection('users')
      .doc(userDoc.id)
      .collection('events')
      .add({
        createdDate: new Date(),
        event,
        eventName,
        message: `${feedbackRequestDoc.data().customerName} gave a ${response} star review`,
        customerPhone: feedbackRequestDoc.data().customerPhone,
        customerName: feedbackRequestDoc.data().customerName,
      });
    if (notificationsEnabled) {
      const client = new Twilio(config().twilio.sid, config().twilio.token);
      await client.messages.create({
        to: notificationPhoneNumber,
        from: appPhone,
        body: `${response} Star Feedback Recieved from ${feedbackRequestDoc.data().customerName}
The customer's phone number is ${feedbackRequestDoc.data().customerPhone}`,
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
    }, 3000);
  } else if (response === '5') {
    await firestore()
      .collection('users')
      .doc(userDoc.id)
      .collection('events')
      .add({
        createdDate: new Date(),
        event: 'five_star_review',
        eventName: 'Five Star Review',
        message: `${feedbackRequestDoc.data().customerName} gave a ${response} star review`,
        customerPhone: feedbackRequestDoc.data().customerPhone,
        customerName: feedbackRequestDoc.data().customerName,
      });
    await feedbackRequestDoc.ref.set({ resultNumber: Number(response) }, { merge: true });
    twimlResponse.message(`${fiveStarResponse}

https://us-central1-thrill-check.cloudfunctions.net/redirect?b=${userDoc.id}&c=${feedbackRequestDoc.id}`);

    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twimlResponse.toString());
    }, 3000);
  } else {
    twimlResponse.message(invalidInputResponse);

    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twimlResponse.toString());
    }, 3000);
  }
};
