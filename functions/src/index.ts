import * as functions from 'firebase-functions';
import { handleOnboardUser } from './onboardUser';

export const onboardUser = functions.https.onCall(handleOnboardUser);
