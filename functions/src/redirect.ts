import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';

export const handleRedirect = async (req: functions.https.Request, res: functions.Response) => {
  const userDoc = await firestore()
    .collection('users')
    .doc(req.query['b'] as string)
    .get();

  const userData = userDoc.data();

  await firestore()
    .collection('users')
    .doc(userDoc.id)
    .collection('feedbackRequests')
    .doc(req.query['c'] as string)
    .set({ clickedDate: new Date(), reviewLinkClicked: true }, { merge: true });

  res.redirect(userData?.reviewUrl);
};
