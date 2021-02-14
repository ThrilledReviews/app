import { https, Response } from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { twiml } from 'twilio';

export const handleTestTextResponse = async (req: https.Request, res: Response) => {
  res.set('Access-Control-Allow-Origin', '*');
  const response: string = req.body.Body;
  const from: string = req.body.From;

  const twimlResponse = new twiml.MessagingResponse();

  const userDoc = (
    await firestore()
      .collection('users')
      .where('notificationPhoneNumber', '==', from)
      .limit(1)
      .get()
  ).docs[0];

  const fiveStarResponse: string = userDoc.get('fiveStarResponse');
  const oneToFourStarResponse: string = userDoc.get('oneToFourStarResponse');
  const invalidInputResponse: string = userDoc.get('invalidInputResponse');
  const alreadyAnsweredResponse: string = userDoc.get('alreadyAnsweredResponse');

  if (!userDoc) {
    res.writeHead(204, 'No Feedback Request Matching This #');
    res.end();
    return;
  }

  if (userDoc.data().testResultNumber !== -1) {
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
      .set(
        {
          testResultNumber: Number(response),
          testReviewEvent: event,
          testReviewEventName: eventName,
          testReviewEventDate: new Date(),
          testReviewEventMessage: `${userDoc.data().fullName} gave a ${response} star review`,
          testCustomerPhone: userDoc.data().notificationPhoneNumber,
          testCustomerName: userDoc.data().fullName,
        },
        { merge: true }
      );

    await userDoc.ref.set(
      {
        testResultNumber: Number(response),
      },
      { merge: true }
    );

    twimlResponse.message(oneToFourStarResponse);

    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twimlResponse.toString());
    }, 5000);
  } else if (response === '5') {
    await userDoc.ref.set(
      {
        testResultNumber: Number(response),
        testReviewEventDate: new Date(),
        testReviewEvent: 'five_star_review',
        testReviewEventName: 'Five Star Review',
        testReviewEventMessage: `${userDoc.data().fullName} gave a ${response} star review`,
        testCustomerPhone: userDoc.data().notificationPhoneNumber,
        testCustomerName: userDoc.data().fullName,
      },
      { merge: true }
    );
    twimlResponse.message(`${fiveStarResponse}

https://us-central1-thrilledreviews.cloudfunctions.net/testRedirect?b=${userDoc.id}`);

    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twimlResponse.toString());
    }, 5000);
  } else {
    twimlResponse.message(invalidInputResponse);

    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twimlResponse.toString());
    }, 5000);
  }
};
