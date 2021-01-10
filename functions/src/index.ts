import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { handleOnboardUser } from './onboardUser';
import { handleRedirect } from './redirect';
import { handleTextResponse } from './textResponse';
import { handleRequestFeedback } from './requestFeedback';
import { createCheckoutSession } from './createCheckout';
import { sendTestFeedbackRequest } from './testFeedbackRequest';
import { handleTestTextResponse } from './testTextResponse';
import { handleTestRedirect } from './testRedirect';
import { handleZapierTestCreds } from './zapierTestCreds';
import { handleZapierRequestFeedback } from './zapierRequestFeedback';

admin.initializeApp();

export const onboardUser = functions.https.onCall(handleOnboardUser);

export const textResponse = functions.https.onRequest(handleTextResponse);

export const redirect = functions.https.onRequest(handleRedirect);

export const requestFeedback = functions.https.onCall(handleRequestFeedback);

export const testFeedbackRequest = functions.https.onCall(sendTestFeedbackRequest);

export const testTextResponse = functions.https.onRequest(handleTestTextResponse);

export const testRedirect = functions.https.onRequest(handleTestRedirect);

export const createCheckout = createCheckoutSession;

export const zapierTestCreds = functions.https.onRequest(handleZapierTestCreds);
export const zapierRequestFeedback = functions.https.onRequest(handleZapierRequestFeedback);
