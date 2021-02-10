import { firestore } from 'firebase-admin';
import { https, config } from 'firebase-functions';
import { Twilio } from 'twilio';

export const sendTestFeedbackRequest = async (data: {}, context: https.CallableContext) => {
  if (!context.auth?.uid) return;
  const twilio = new Twilio(config().twilio.sid, config().twilio.token);

  const userDoc = (await firestore().collection('users').doc(context.auth?.uid).get()) as any;

  const to = userDoc.data().notificationPhoneNumber;
  const body = userDoc.data()?.outreachMessage;
  let from = '+15124881952';

  await firestore()
    .collection('users')
    .doc(context.auth?.uid)
    .set(
      { sentTestRequest: true, testRequestCreatedDate: new Date(), testResultNumber: -1 },
      { merge: true }
    );

  await twilio.messages.create({ to, body, from });
  return;
};
