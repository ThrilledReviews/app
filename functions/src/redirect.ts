import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';
import { Stripe } from 'stripe';

export const handleRedirect = async (req: functions.https.Request, res: functions.Response) => {
  const stripe = new Stripe(
    'sk_test_51HzhyWLjqDOPvfebhQVu4zAerTzXbU1kHNGuq9QIoLY1LVYrghdnEAFV6BPro2efUqe6bYqeOKxieU0t9h0RbjFx001xjchUB2',
    { apiVersion: '2020-08-27' }
  );

  const userDoc = await firestore()
    .collection('users')
    .doc(req.query['b'] as string)
    .get();

  const userData = userDoc.data();

  const feedback: any = (
    await firestore()
      .collection('users')
      .doc(userDoc.id)
      .collection('feedbackRequests')
      .doc(req.query['c'] as string)
      .get()
  ).data();

  await firestore()
    .collection('users')
    .doc(userDoc.id)
    .collection('feedbackRequests')
    .doc(req.query['c'] as string)
    .set({ clickedDate: new Date(), reviewLinkClicked: true }, { merge: true });

  if (!feedback.reviewLinkClicked) {
    await firestore()
      .collection('users')
      .doc(userDoc.id)
      .collection('events')
      .add({
        createdDate: new Date(),
        event: 'review_link_clicked',
        eventName: 'Review Link Clicked',
        message: `${feedback.customerName} just clicked a review link!`,
        customerPhone: feedback.customerPhone,
        customerName: feedback.customerName,
      });
  }

  const subscription = (
    await firestore()
      .collection('users')
      .doc(userDoc.id)
      .collection('subscriptions')
      .where('status', '==', 'active')
      .limit(1)
      .get()
  ).docs[0];

  if (!feedback.reviewLinkClicked) {
    const subItem = (await stripe.subscriptions.retrieve(subscription.id)).items.data[0];
    await stripe.subscriptionItems.createUsageRecord(subItem.id, {
      quantity: 1,
      timestamp: Math.floor(Date.now() / 1000),
      action: 'increment',
    });
  }

  res.redirect(userData?.reviewUrl);
};
