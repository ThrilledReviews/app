import * as functions from 'firebase-functions';
import { auth, firestore } from 'firebase-admin';

import {
  isBusinessName,
  isElevenDigitPhone,
  isFullName,
  isUrl,
  isBoolean,
} from './utils/validation';

interface OnboardData {
  fullName: string;
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

export const handleOnboardUser = async (
  data: OnboardData,
  context: functions.https.CallableContext
) => {
  if (!context.auth) return { status: 401, message: 'User Must Be Signed In' };

  // input validation
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

  data.businessAreaCode = data.businessPhoneNumber.slice(2, 5);
  data.alreadyAnsweredResponse = `We appreciate your review! If you'd like to get in touch with ${data.businessName}, please call ${data.businessPhoneNumber}`;
  data.fiveStarResponse = `We're glad that we could impress!
Reviews are very important to our business - would you mind leaving us one?`;
  data.invalidInputResponse = `Our system only understands the numbers 1-5. If you'd like to get in touch with us, please call ${data.businessPhoneNumber}`;
  data.oneToFourStarResponse = `We're sorry to hear that our team didn't meet your expectations. We'll follow up to see what went wrong.`;
  data.outreachMessage = `Thanks for choosing ${data.businessName}! If you don't mind the question, on a scale of 1-5, how did we do?`;
  data.email = (await auth().getUser(context.auth.uid)).email;

  await firestore().collection('users').doc(context.auth.uid).set(data);

  return { status: 204, message: 'Successfully Onboarded User' };
};
