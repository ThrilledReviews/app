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
  const from = userDoc.data()?.appPhone;

  const feedbackRequest = { ...data, createdDate: new Date(), resultNumber: -1 };
  const event = {
    message: `You sent ${data.customerName} a feedback request`,
    eventType: 'feedback_requested',
    eventDate: new Date(),
  };

  await twilio.messages.create({ to, body, from });
  await firestore()
    .collection('users')
    .doc(context.auth?.uid)
    .collection('feedbackRequests')
    .add(feedbackRequest);
  await firestore().collection('users').doc(context.auth?.uid).collection('events').add(event);
};
