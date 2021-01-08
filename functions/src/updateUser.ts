import * as functions from 'firebase-functions';
import { firestore } from 'firebase-admin';

import {
  isBusinessName,
  isElevenDigitPhone,
  isFullName,
  isBoolean,
  isUrl,
} from './utils/validation';

interface UpdateData {
  fullName: string;
  username: string;
  businessName: string;
  reviewUrl: string;
  email?: string;
  customerId?: string;
  businessAreaCode?: string;
  businessPhoneNumber: string;
  notificationPhoneNumber: string;
  notificationsEnabled?: boolean;
  alreadyAnsweredResponse?: string;
  invalidInputResponse?: string;
  fiveStarResponse?: string;
  oneToFourStarResponse?: string;
  outreachMessage?: string;
}

export const handleUpdateUser = async (
  data: UpdateData,
  context: functions.https.CallableContext
) => {
  if (!context.auth) return { message: 'Not Authenticated', status: 401 };
  try {
    isFullName(data.fullName);
    isBusinessName(data.businessName);
    isElevenDigitPhone(data.businessPhoneNumber);
    isElevenDigitPhone(data.notificationPhoneNumber);
    isBoolean(data.notificationsEnabled);
    isUrl(data.reviewUrl);
  } catch (error) {
    return { status: 400, message: error.message };
  }

  await firestore().collection('users').doc(context.auth.uid).set(data, { merge: true });
  return { message: 'Successfully Updated', status: 200 };
};
