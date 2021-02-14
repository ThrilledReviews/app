import { firestore } from 'firebase-admin';
import { config, https } from 'firebase-functions';
import { Twilio } from 'twilio';

interface FeedbackRequest {
  customerName: string;
  customerPhone: string;
  createdDate?: Date;
  resultNumber?: number;
  reviewLinkClicked?: boolean;
}

export const handleRequestFeedback = async (
  data: FeedbackRequest,
  context: https.CallableContext
) => {
  if (!context.auth?.uid) return;
  const twilio = new Twilio(config().twilio.sid, config().twilio.token);

  const userDoc = await firestore().collection('users').doc(context.auth?.uid).get();

  const to = data.customerPhone;
  const body = userDoc.data()?.outreachMessage;
  let from = userDoc.data()?.appPhone;

  if (!from) {
    const { phoneNumber } = await twilio.incomingPhoneNumbers.create({
      areaCode: userDoc.get('businessAreaCode'),
      smsUrl: 'https://us-central1-thrilledreviews.cloudfunctions.net/textResponse',
    });
    await userDoc.ref.set({ appPhone: phoneNumber }, { merge: true });
    from = phoneNumber;
  }

  const feedbackRequest = { ...data, createdDate: new Date(), resultNumber: -1 };

  await twilio.messages.create({ to, body, from });
  await firestore()
    .collection('users')
    .doc(context.auth?.uid)
    .collection('feedbackRequests')
    .add(feedbackRequest);
};
