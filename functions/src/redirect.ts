import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';

export const handleRedirect = async (req: functions.https.Request, res: functions.Response) => {
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
        message: `${feedback.customerName} clicked your review link!`,
        customerPhone: feedback.customerPhone,
        customerName: feedback.customerName,
      });
  }

  res.redirect(userData?.reviewUrl);
};
