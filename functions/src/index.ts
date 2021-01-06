import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { handleOnboardUser } from './onboardUser';
import { handleRedirect } from './redirect';
import { handleTextResponse } from './textResponse';

admin.initializeApp();

export const onboardUser = functions.https.onCall(handleOnboardUser);

export const textResponse = functions.https.onRequest(handleTextResponse);

export const redirect = functions.https.onRequest(handleRedirect);
