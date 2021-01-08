import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';

export const handleTestRedirect = async (req: functions.https.Request, res: functions.Response) => {
  const userDoc = await firestore()
    .collection('users')
    .doc(req.query['b'] as string)
    .get();

  const userData = userDoc.data() as any;
  const testRedirectClickedDate = new Date();
  const testRedirectLinkClicked = true;

  if (!userData?.testRedirectLinkClicked) {
    await firestore().collection('users').doc(userDoc.id).set(
      {
        testRedirectClickedDate,
        testRedirectLinkClicked,
      },
      { merge: true }
    );
  }

  res.redirect(userData?.reviewUrl);
};
