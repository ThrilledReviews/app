import { firestore } from 'firebase-admin';
import { https, Response } from 'firebase-functions';

export const handleZapierTestCreds = async (req: https.Request, res: Response) => {
  const apiKey = req.query['apiKey'];
  const userDoc = (await firestore().collection('users').where('apiKey', '==', apiKey).get())
    .docs[0];
  if (userDoc) {
    res.status(200).send({ userId: userDoc.id });
    return;
  } else {
    res.status(400).send('Invalid API Key');
    return;
  }
};
