import { useStripe } from '@stripe/react-stripe-js';
import { Stripe } from '@stripe/stripe-js';
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionDataOnce, useDocumentData } from 'react-firebase-hooks/firestore';

export const PricingPage = () => {
  const stripe = useStripe() as Stripe;
  const [user] = useAuthState(firebase.auth());
  const [userDoc] = useDocumentData(firebase.firestore().collection('users').doc(user?.uid)) as any;
  const [subscription] = useCollectionDataOnce(
    firebase.firestore().collection('users').doc(user?.uid).collection('subscriptions')
  );

  const handleCheckout = async (price: string) => {
    const docRef = await firebase
      .firestore()
      .collection('users')
      .doc(user?.uid)
      .collection('checkouts')
      .add({
        price,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    docRef.onSnapshot((snap) => {
      const { error, sessionId } = snap.data() as any;
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className='bg-gray-900'>
      <div className='pt-8 px-4 sm:px-6 lg:px-8 lg:pt-10'>
        <div className='text-center'>
          <h2 className='text-lg leading-6 font-semibold text-blue-500 uppercase tracking-wider'>
            Thrilled Reviews Pricing
          </h2>
          <p className='mt-3 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl'>
            The Right Price For Your Business
          </p>
          <p className='mt-3 max-w-3xl mx-auto text-xl text-white sm:mt-5 sm:text-2xl'>
            We can't wait for you to get started.{' '}
            <span className='text-white bg-transparent'>
              Please activate your plan to continue
              {subscription && subscription?.length > 0 ? ' to your 14 day Free Trial.' : '.'}
            </span>
          </p>
        </div>
      </div>

      <div className='mt-16 bg-white lg:mt-20'>
        <div className='relative z-0'>
          <div className='absolute inset-0 h-5/6 bg-gray-900 lg:h-2/3'></div>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='relative lg:grid lg:grid-cols-7'>
              <div className='mt-10 max-w-lg mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4'>
                <div className='relative z-10 rounded-lg shadow-xl'>
                  <div
                    className='pointer-events-none absolute inset-0 rounded-lg border-2 border-blue-600'
                    aria-hidden='true'
                  ></div>
                  <div className='absolute inset-x-0 top-0 transform translate-y-px'>
                    <div className='flex justify-center transform -translate-y-1/2'>
                      <span className='inline-flex rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold tracking-wider uppercase text-white'>
                        Most popular
                      </span>
                    </div>
                  </div>
                  <div className='bg-white rounded-t-lg px-6 pt-12 pb-10'>
                    <div>
                      <h3
                        className='text-center text-3xl font-semibold text-gray-900 sm:-mx-6'
                        id='tier-growth'
                      >
                        Pricing
                      </h3>
                      <div className='mt-4 flex items-center justify-center'>
                        <span className='px-3 flex items-start text-6xl tracking-tight text-gray-900 sm:text-6xl'>
                          <span className='font-extrabold'>Custom</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='border-t-2 border-gray-100 rounded-b-lg pt-10 pb-8 px-6 bg-gray-50 sm:px-10 sm:py-10'>
                    <ul className='space-y-4'>
                      <li className='flex items-start'>
                        <div className='flex-shrink-0'>
                          {/* <!-- Heroicon name: check --> */}
                          <svg
                            className='flex-shrink-0 h-6 w-6 text-green-500'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            aria-hidden='true'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M5 13l4 4L19 7'
                            />
                          </svg>
                        </div>
                        <p className='ml-3 text-base font-medium text-gray-500'>
                          Click the blue button to view your quote
                        </p>
                      </li>

                      <li className='flex items-start'>
                        <div className='flex-shrink-0'>
                          {/* <!-- Heroicon name: check --> */}
                          <svg
                            className='flex-shrink-0 h-6 w-6 text-green-500'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            aria-hidden='true'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M5 13l4 4L19 7'
                            />
                          </svg>
                        </div>
                        <p className='ml-3 text-base font-medium text-gray-500'>
                          Includes Everything Thrilled Reviews Has To Offer
                        </p>
                      </li>

                      <li className='flex items-start'>
                        <div className='flex-shrink-0'>
                          {/* <!-- Heroicon name: check --> */}
                          <svg
                            className='flex-shrink-0 h-6 w-6 text-green-500'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            aria-hidden='true'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M5 13l4 4L19 7'
                            />
                          </svg>
                        </div>
                        <p className='ml-3 text-base font-medium text-gray-500'>
                          Zapier Integration Setup
                        </p>
                      </li>

                      <li className='flex items-start'>
                        <div className='flex-shrink-0'>
                          {/* <!-- Heroicon name: check --> */}
                          <svg
                            className='flex-shrink-0 h-6 w-6 text-green-500'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            aria-hidden='true'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M5 13l4 4L19 7'
                            />
                          </svg>
                        </div>
                        <p className='ml-3 text-base font-medium text-gray-500'>
                          Onboarding Video Call & Priority Email Support
                        </p>
                      </li>
                    </ul>
                    <div className='mt-10'>
                      <div className='rounded-lg shadow-md'>
                        <span
                          onClick={() => handleCheckout(userDoc?.stripePrice)}
                          className='block w-full text-center cursor-pointer rounded-lg border border-transparent bg-blue-600 px-6 py-4 text-xl leading-6 font-medium text-white hover:bg-blue-700'
                          aria-describedby='tier-growth'
                        >
                          Subscribe to Start Using Thrilled Reviews
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
