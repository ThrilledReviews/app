import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin';

const admin = initializeApp();
const firestore = admin.firestore();

export const handleRedirect = async (req: functions.https.Request, res: functions.Response) => {
  const userDoc = await firestore
    .collection('users')
    .doc(req.query['b'] as string)
    .get();

  const userData = userDoc.data();

  await firestore
    .collection('users')
    .doc(userDoc.id)
    .collection('feedbackRequests')
    .doc(req.query['c'] as string)
    .set({ clickedDate: new Date(), reviewLinkClicked: true }, { merge: true });

  res.redirect(userData?.reviewUrl);
};
