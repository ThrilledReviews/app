import { useStripe } from '@stripe/react-stripe-js';
import { Stripe } from '@stripe/stripe-js';
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

export const PricingPage = () => {
  const stripe = useStripe() as Stripe;
  const [user] = useAuthState(firebase.auth());
  const [subscription] = useCollectionDataOnce(
    firebase.firestore().collection('users').doc(user?.uid).collection('subscriptions')
  );

  const handleCheckout = async (price: string) => {
    const docRef = await firebase
      .firestore()
      .collection('users')
      .doc(user?.uid)
      .collection('checkout_sessions')
      .add({
        price,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    console.log('test');
    docRef.onSnapshot((snap) => {
      const { error, sessionId } = snap.data() as any;
      console.log(sessionId);
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
    <div>
      <div className='bg-gray-900'>
        <div className='pt-8 px-4 sm:px-6 lg:px-8 lg:pt-10'>
          <div className='text-center'>
            <h2 className='mt-3 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl'>
              The Right Price For Every Business
            </h2>
            <p className='mt-3 max-w-4xl mx-auto text-xl text-white sm:mt-5 sm:text-2xl'>
              We can't wait for you to get started.{' '}
              <span className='text-white bg-transparent'>
                Please activate your account to continue
                {subscription && subscription?.length === 0
                  ? ' to your 14 day free trial - cancel through the app at any time.'
                  : '.'}
              </span>
            </p>
          </div>
        </div>

        <div className='mt-16 bg-white pb-12 lg:mt-20 lg:pb-12'>
          <div className='relative z-0'>
            <div className='absolute inset-0 h-5/6 bg-gray-900 lg:h-2/3'></div>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='relative lg:grid lg:grid-cols-7'>
                <div className='mx-auto max-w-md lg:mx-0 lg:max-w-none lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3'>
                  <div className='h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-l-lg'>
                    <div className='flex-1 flex flex-col'>
                      <div className='bg-white px-6 py-10'>
                        <div>
                          <h3
                            className='text-center text-2xl font-medium text-gray-900'
                            id='tier-hobby'
                          >
                            Standard
                          </h3>
                          <div className='mt-4 flex items-center justify-center'>
                            <span className='px-3 flex items-start text-6xl tracking-tight text-gray-900'>
                              <span className='mt-2 mr-2 text-4xl font-medium'>$</span>
                              <span className='font-extrabold'>75</span>
                            </span>
                            <span className='text-xl font-medium text-gray-500'>/month</span>
                          </div>
                        </div>
                      </div>
                      <div className='flex-1 flex flex-col justify-between border-t-2 border-gray-100 p-6 bg-gray-50 sm:p-10 lg:p-6 xl:p-10'>
                        <ul className='space-y-4'>
                          <li className='flex items-start'>
                            <div className='flex-shrink-0'>
                              {/* <!-- Heroicon name: outline/check --> */}
                              <svg
                                className='flex-shrink-0 h-6 w-6 text-green-500'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                aria-hidden='true'
                              >
                                <path
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='2'
                                  d='M5 13l4 4L19 7'
                                />
                              </svg>
                            </div>
                            <p className='ml-3 text-base font-medium text-gray-500'>
                              Up to 100 Jobs / Month
                            </p>
                          </li>

                          <li className='flex items-start'>
                            <div className='flex-shrink-0'>
                              {/* <!-- Heroicon name: outline/check --> */}
                              <svg
                                className='flex-shrink-0 h-6 w-6 text-green-500'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                aria-hidden='true'
                              >
                                <path
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='2'
                                  d='M5 13l4 4L19 7'
                                />
                              </svg>
                            </div>
                            <p className='ml-3 text-base font-medium text-gray-500'>
                              Email & Chat Support
                            </p>
                          </li>

                          <li className='flex items-start'>
                            <div className='flex-shrink-0'>
                              {/* <!-- Heroicon name: outline/check --> */}
                              <svg
                                className='flex-shrink-0 h-6 w-6 text-green-500'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                aria-hidden='true'
                              >
                                <path
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='2'
                                  d='M5 13l4 4L19 7'
                                />
                              </svg>
                            </div>
                            <p className='ml-3 text-base font-medium text-gray-500'>
                              All Features Included
                            </p>
                          </li>
                        </ul>
                        <div className='mt-8'>
                          <div className='rounded-lg shadow-lg'>
                            <span
                              onClick={() =>
                                handleCheckout(
                                  process.env.NODE_ENV === 'production'
                                    ? 'price_1IKTmyLK5eTx3dXT4AczcWNg'
                                    : 'price_1IHakTLK5eTx3dXT4xHrHTwm'
                                )
                              }
                              className='block w-full text-center cursor-pointer rounded-lg border border-transparent bg-white px-6 py-4 text-base leading-6 font-medium text-blue-500 hover:bg-gray-100'
                            >
                              Start Your Trial
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                          Professional
                        </h3>
                        <div className='mt-4 flex items-center justify-center'>
                          <span className='px-3 flex items-start text-6xl tracking-tight text-gray-900 sm:text-6xl'>
                            <span className='mt-2 mr-2 text-4xl font-medium'>$</span>
                            <span className='font-extrabold'>150</span>
                          </span>
                          <span className='text-2xl font-medium text-gray-500'>/month</span>
                        </div>
                      </div>
                    </div>
                    <div className='border-t-2 border-gray-100 rounded-b-lg pt-10 pb-8 px-6 bg-gray-50 sm:px-10 sm:py-10'>
                      <ul className='space-y-4'>
                        <li className='flex items-start'>
                          <div className='flex-shrink-0'>
                            {/* <!-- Heroicon name: outline/check --> */}
                            <svg
                              className='flex-shrink-0 h-6 w-6 text-green-500'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              aria-hidden='true'
                            >
                              <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M5 13l4 4L19 7'
                              />
                            </svg>
                          </div>
                          <p className='ml-3 text-base font-medium text-gray-500'>
                            Up to 300 Jobs / Month
                          </p>
                        </li>

                        <li className='flex items-start'>
                          <div className='flex-shrink-0'>
                            {/* <!-- Heroicon name: outline/check --> */}
                            <svg
                              className='flex-shrink-0 h-6 w-6 text-green-500'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              aria-hidden='true'
                            >
                              <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M5 13l4 4L19 7'
                              />
                            </svg>
                          </div>
                          <p className='ml-3 text-base font-medium text-gray-500'>
                            White Glove Onboarding
                          </p>
                        </li>

                        <li className='flex items-start'>
                          <div className='flex-shrink-0'>
                            {/* <!-- Heroicon name: outline/check --> */}
                            <svg
                              className='flex-shrink-0 h-6 w-6 text-green-500'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              aria-hidden='true'
                            >
                              <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M5 13l4 4L19 7'
                              />
                            </svg>
                          </div>
                          <p className='ml-3 text-base font-medium text-gray-500'>
                            CRM Integration Assistance
                          </p>
                        </li>

                        <li className='flex items-start'>
                          <div className='flex-shrink-0'>
                            {/* <!-- Heroicon name: outline/check --> */}
                            <svg
                              className='flex-shrink-0 h-6 w-6 text-green-500'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              aria-hidden='true'
                            >
                              <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M5 13l4 4L19 7'
                              />
                            </svg>
                          </div>
                          <p className='ml-3 text-base font-medium text-gray-500'>
                            Priority Email & Chat Support
                          </p>
                        </li>

                        <li className='flex items-start'>
                          <div className='flex-shrink-0'>
                            {/* <!-- Heroicon name: outline/check --> */}
                            <svg
                              className='flex-shrink-0 h-6 w-6 text-green-500'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              aria-hidden='true'
                            >
                              <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M5 13l4 4L19 7'
                              />
                            </svg>
                          </div>
                          <p className='ml-3 text-base font-medium text-gray-500'>
                            Dedicated Customer Success Representative
                          </p>
                        </li>
                      </ul>
                      <div className='mt-10'>
                        <div className='rounded-lg shadow-md'>
                          <span
                            onClick={() =>
                              handleCheckout(
                                process.env.NODE_ENV === 'production'
                                  ? 'price_1IKTmzLK5eTx3dXT9kV2DkZN'
                                  : 'price_1IHakTLK5eTx3dXT4xHrHTwm'
                              )
                            }
                            className='block w-full text-center cursor-pointer rounded-lg border border-transparent bg-blue-600 px-6 py-4 text-xl leading-6 font-medium text-white hover:bg-blue-700'
                            aria-describedby='tier-growth'
                          >
                            Start your trial
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-10 mx-auto max-w-md lg:m-0 lg:max-w-none lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3'>
                  <div className='h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-r-lg'>
                    <div className='flex-1 flex flex-col'>
                      <div className='bg-white px-6 py-10'>
                        <div>
                          <h3
                            className='text-center text-2xl font-medium text-gray-900'
                            id='tier-scale'
                          >
                            Enterprise
                          </h3>
                          <div className='mt-4 flex items-center justify-center'>
                            <span className='px-3 flex items-start text-5xl tracking-tight text-gray-900'>
                              <span className='font-extrabold'>Contact Us</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='flex-1 flex flex-col justify-between border-t-2 border-gray-100 p-6 bg-gray-50 sm:p-10 lg:p-6 xl:p-10'>
                        <ul className='space-y-4'>
                          <li className='flex items-start'>
                            <div className='flex-shrink-0'>
                              {/* <!-- Heroicon name: outline/check --> */}
                              <svg
                                className='flex-shrink-0 h-6 w-6 text-green-500'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                aria-hidden='true'
                              >
                                <path
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='2'
                                  d='M5 13l4 4L19 7'
                                />
                              </svg>
                            </div>
                            <p className='ml-3 text-base font-medium text-gray-500'>
                              Our CEO's Phone #
                            </p>
                          </li>

                          <li className='flex items-start'>
                            <div className='flex-shrink-0'>
                              {/* <!-- Heroicon name: outline/check --> */}
                              <svg
                                className='flex-shrink-0 h-6 w-6 text-green-500'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                aria-hidden='true'
                              >
                                <path
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='2'
                                  d='M5 13l4 4L19 7'
                                />
                              </svg>
                            </div>
                            <p className='ml-3 text-base font-medium text-gray-500'>
                              Daytime Phone Support
                            </p>
                          </li>

                          <li className='flex items-start'>
                            <div className='flex-shrink-0'>
                              {/* <!-- Heroicon name: outline/check --> */}
                              <svg
                                className='flex-shrink-0 h-6 w-6 text-green-500'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                aria-hidden='true'
                              >
                                <path
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='2'
                                  d='M5 13l4 4L19 7'
                                />
                              </svg>
                            </div>
                            <p className='ml-3 text-base font-medium text-gray-500'>
                              Feature Request Priority
                            </p>
                          </li>
                        </ul>
                        <div className='mt-8'>
                          <div className='rounded-lg shadow-lg'>
                            <span
                              onClick={() =>
                                handleCheckout(
                                  process.env.NODE_ENV === 'production'
                                    ? 'price_1IKTmzLK5eTx3dXT9kV2DkZN'
                                    : 'price_1IHakTLK5eTx3dXT4xHrHTwm'
                                )
                              }
                              className='block w-full text-center cursor-pointer rounded-lg border border-transparent bg-white px-6 py-4 text-base leading-6 font-medium text-blue-500 hover:bg-gray-100'
                            >
                              Start Your Trial
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
      </div>
    </div>
  );
};
