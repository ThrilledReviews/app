import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as toix from '@toi/toix';
import { isAreaCode, isElevenDigitPhone, isName } from './utils/validation';

interface OnboardData {
  fullName: string;
  username: string;
  businessName: string;
  reviewUrl: string;
  areaCode: string;
  notificationPhoneNumber: string;
}

admin.initializeApp();

export const handleOnboardUser = async (
  data: OnboardData,
  context: functions.https.CallableContext
) => {
  if (!context.auth) throw new Error('User Must Be Signed In');

  // input validation
  isName(data.fullName);
  isAreaCode(data.areaCode);
  isElevenDigitPhone(data.notificationPhoneNumber);

  // check for existing usernames
  const usernameMatch = await admin
    .firestore()
    .collection('users')
    .where('username', '==', data.username)
    .limit(1)
    .get();

  if (usernameMatch.docs.length !== 0)
    throw new Error('Username Is Already Taken, Pick Something Else');
};
