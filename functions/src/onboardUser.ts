import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {
  isAreaCode,
  isBusinessName,
  isElevenDigitPhone,
  isFullName,
  isUrl,
  isUsername,
} from './utils/validation';

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
  if (!context.auth) return { status: 401, message: 'User Must Be Signed In' };

  // input validation
  try {
    isFullName(data.fullName);
    isUsername(data.username);
    isBusinessName(data.businessName);
    isAreaCode(data.areaCode);
    isElevenDigitPhone(data.notificationPhoneNumber);
    isUrl(data.reviewUrl);
  } catch (error) {
    return { status: 400, message: error.message };
  }

  // check for existing usernames
  const usernameMatch = await admin
    .firestore()
    .collection('users')
    .where('username', '==', data.username)
    .limit(1)
    .get();

  if (usernameMatch.docs.length !== 0)
    return { status: 400, message: 'Username already taken. Pick something else' };

  await admin.firestore().collection('users').doc(context.auth.uid).set(data);

  return;
};
