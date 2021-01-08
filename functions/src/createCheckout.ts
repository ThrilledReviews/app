import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import Stripe from 'stripe';

const createCustomerRecord = async ({ email, uid }: { email?: string; uid: string }) => {
  try {
    // logs.creatingCustomer(uid);

    const stripe = new Stripe(functions.config().stripe.sk, {
      apiVersion: '2020-08-27',
      // Register extension as a Stripe plugin
      // https://stripe.com/docs/building-plugins#setappinfo
      appInfo: {
        name: 'Firebase firestore-stripe-subscriptions',
        version: '0.1.8',
      },
    });
    const customerData: any = {
      metadata: {
        firebaseUID: uid,
      },
    };
    if (email) customerData.email = email;
    const customer = await stripe.customers.create(customerData);
    // Add a mapping record in Cloud Firestore.
    const customerRecord = {
      stripeId: customer.id,
      stripeLink: `https://dashboard.stripe.com${customer.livemode ? '' : '/test'}/customers/${
        customer.id
      }`,
    };
    await admin.firestore().collection('users').doc(uid).set(customerRecord, { merge: true });
    // logs.customerCreated(customer.id, customer.livemode);
    return customerRecord;
  } catch (error) {
    functions.logger.log(error);
    return null;
  }
};

export const createCheckoutSession = functions.firestore
  .document(`/users/{uid}/checkouts/{id}`)
  .onCreate(async (snap: any, context: any) => {
    const stripe = new Stripe(functions.config().stripe.sk, {
      apiVersion: '2020-08-27',
      // Register extension as a Stripe plugin
      // https://stripe.com/docs/building-plugins#setappinfo
      appInfo: {
        name: 'Firebase firestore-stripe-subscriptions',
        version: '0.1.8',
      },
    });
    const {
      price,
      success_url,
      cancel_url,
      payment_method_types = ['card'],
      metadata = {},
      tax_rates = [],
      allow_promotion_codes = false,
      trial_from_plan = true,
      line_items,
      billing_address_collection = 'required',
    } = snap.data();
    try {
      // logs.creatingCheckoutSession(context.params.id);
      // Get stripe customer id
      let customerRecord = (await snap.ref.parent.parent.get()).data();
      functions.logger.log(customerRecord);
      if (!customerRecord?.stripeId) {
        const { email } = await admin.auth().getUser(context.params.uid);
        customerRecord = await createCustomerRecord({
          uid: context.params.uid,
          email,
        });
      }
      const customer = customerRecord.stripeId;
      const session = await stripe.checkout.sessions.create(
        {
          billing_address_collection,
          payment_method_types,
          customer,
          line_items: line_items
            ? line_items
            : [
                {
                  price,
                  tax_rates,
                },
              ],
          mode: 'subscription',
          allow_promotion_codes,
          subscription_data: {
            trial_from_plan,
            metadata,
          },
          success_url,
          cancel_url,
        },
        { idempotencyKey: context.params.id }
      );
      await snap.ref.set(
        {
          sessionId: session.id,
          created: admin.firestore.Timestamp.now(),
        },
        { merge: true }
      );
      // logs.checkoutSessionCreated(context.params.id);
      return;
    } catch (error) {
      // logs.checkoutSessionCreationError(context.params.id, error);
      await snap.ref.set({ error: { message: error.message } }, { merge: true });
    }
  });
