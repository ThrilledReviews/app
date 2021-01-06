import * as functions from 'firebase-functions';
import { handleOnboardUser } from './onboardUser';
import { handleTextResponse } from './textResponse';

export const onboardUser = functions.https.onCall(handleOnboardUser);

export const textResponse = functions.https.onRequest(handleTextResponse);
