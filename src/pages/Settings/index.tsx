import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { Transition } from '@headlessui/react';
import { useDocumentData, useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useStripe } from '@stripe/react-stripe-js';
import { Stripe } from '@stripe/stripe-js';
import { homeRoute, settingsRoute } from '../../constants/routes';

export const SettingsPage = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [reviewUrl, setReviewUrl] = useState('');
  const [fullName, setFullName] = useState('');
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState('');
  const [notificationPhoneNumber, setNotificationPhoneNumber] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const stripe = useStripe() as Stripe;
  const [user] = useAuthState(firebase.auth());
  const [userDoc] = useDocumentData(firebase.firestore().collection('users').doc(user?.uid)) as [
    any,
    any,
    any
  ];
  useEffect(() => {
    setBusinessName(userDoc?.businessName);
    setReviewUrl(userDoc?.reviewUrl);
    setFullName(userDoc?.fullName);
    setBusinessPhoneNumber(userDoc?.businessPhoneNumber);
    setNotificationPhoneNumber(userDoc?.notificationPhoneNumber);
    setNotificationsEnabled(userDoc?.notificationsEnabled);
  }, [
    user.uid,
    userDoc?.businessName,
    userDoc?.reviewUrl,
    userDoc?.businessPhoneNumber,
    userDoc?.fullName,
    userDoc?.notificationPhoneNumber,
    userDoc?.notificationsEnabled,
  ]);

  const [subscriptionData, loading] = useCollectionData(
    firebase
      .firestore()
      .collection('users')
      .doc(user?.uid)
      .collection('subscriptions')
      .where('status', '==', 'active')
  );

  const handleManageBilling = async () => {
    const { data } = await firebase
      .functions()
      .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink')({
      returnUrl: window.location.origin,
    });
    window.location.assign(data.url);
  };

  const handleCheckout = async () => {
    const docRef = await firebase
      .firestore()
      .collection('users')
      .doc(user?.uid)
      .collection('checkouts')
      .add({
        price: 'price_1I74djLjqDOPvfebNXHhHBPH',
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
        // We have a session, let's redirect to Checkout
        // Init Stripe
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <>
      <div className='relative min-h-screen flex flex-col'>
        {/* <!-- Navbar --> */}
        <nav className='flex-shrink-0 bg-blue-600'>
          <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-8'>
            <div className='relative flex items-center justify-between h-16'>
              {/* <!-- Logo section --> */}
              <Link to={homeRoute}>
                <div className='flex items-center px-2 lg:px-0 xl:w-64'>
                  <div className='flex-shrink-0'>
                    <h1 className='text-3xl text-white'>FivesFilter</h1>
                  </div>
                </div>
              </Link>
              {/* <!-- Search section --> */}
              {/* <div className='flex-1 flex justify-center lg:justify-end'>
            <div className='w-full px-2 lg:px-6'>
              <label htmlFor='search' className='sr-only'>
                Search Customers
              </label>
              <div className='relative text-blue-200 focus-within:text-gray-400'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg
                    className='h-5 w-5'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <input
                  id='search'
                  name='search'
                  className='block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-blue-400 bg-opacity-25 text-blue-100 placeholder-blue-200 focus:outline-none focus:bg-white focus:ring-0 focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm'
                  placeholder='Search Customers'
                  type='search'
                />
              </div>
            </div>
          </div> */}
              <div className='flex lg:hidden'>
                {/* <!-- Mobile menu button --> */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className='bg-blue-600 inline-flex items-center justify-center p-2 rounded-md text-blue-400 hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white'
                  aria-expanded='false'
                >
                  <span className='sr-only'>Open main menu</span>
                  {/* <!-- Icon when menu is closed. --> */}
                  {/* <!--
            Heroicon name: menu-alt-1

            Menu open: "hidden", Menu closed: "block"
          --> */}
                  <svg
                    className={`${menuOpen ? 'hidden' : 'block'} h-6 w-6`}
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
                      d='M4 6h16M4 12h8m-8 6h16'
                    />
                  </svg>
                  {/* <!-- Icon when menu is open. --> */}
                  {/* <!--
            Heroicon name: x

            Menu open: "block", Menu closed: "hidden"
          --> */}
                  <svg
                    className={`${menuOpen ? 'block' : 'hidden'} h-6 w-6`}
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
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
              {/* <!-- Links section --> */}
              <div className='hidden lg:block lg:w-80'>
                <div className='flex items-center justify-end'>
                  <div className='flex'>
                    <Link
                      to={homeRoute}
                      className='px-3 py-2 rounded-md text-sm font-medium text-blue-200 hover:text-white'
                    >
                      Dashboard
                    </Link>
                    {/* <Link
                      to={analyticsRoute}
                      className='px-3 py-2 rounded-md text-sm font-medium text-blue-200 hover:text-white'
                    >
                      Analytics
                    </Link> */}
                    <a
                      href={`mailto:fritz@workhorsesw.com?subject=${encodeURIComponent(
                        'FivesFilter Support Request for Account ' + user?.uid
                      )}`}
                      target='_blank'
                      rel='noreferrer'
                      className='px-3 py-2 rounded-md text-sm font-medium text-blue-200 hover:text-white'
                    >
                      Support
                    </a>
                  </div>
                  {/* <!-- Profile dropdown --> */}
                  <div className='ml-4 relative flex-shrink-0'>
                    <div>
                      <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className='bg-blue-700 flex text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white'
                        id='user-menu'
                        aria-haspopup='true'
                      >
                        <span className='sr-only'>Open user menu</span>
                        <div className='flex-shrink-0 h-12 w-12'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                        </div>
                      </button>
                    </div>
                    {/* <!--
              Profile dropdown panel, show/hide based on dropdown state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            --> */}
                    <Transition
                      show={profileOpen}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-50'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-100'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-50'
                    >
                      <div
                        className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5'
                        role='menu'
                        aria-orientation='vertical'
                        aria-labelledby='user-menu'
                      >
                        <Link
                          to={settingsRoute}
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          role='menuitem'
                        >
                          Account Settings
                        </Link>
                        <div
                          onClick={() => firebase.auth().signOut()}
                          className='block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100'
                          role='menuitem'
                        >
                          Sign Out
                        </div>
                      </div>
                    </Transition>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!subscriptionData?.[0] && !loading && (
            <div className='bg-blue-800'>
              <div className='max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between flex-wrap'>
                  <div className='w-0 flex-1 sm:flex items-center hidden'>
                    <span className='flex p-2 rounded-lg bg-blue-900 border-white border'>
                      <svg
                        className='h-6 w-6 text-white'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                        />
                      </svg>
                    </span>
                    <p className='ml-3 font-medium text-white truncate'>
                      <span className='md:hidden'>You're viewing the demo.</span>
                      <span className='hidden md:inline'>You're viewing the FivesFilter demo.</span>
                    </p>
                  </div>
                  <div className='flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto'>
                    <div
                      onClick={() => handleCheckout()}
                      className='flex items-center cursor-pointer justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-800 bg-white hover:bg-blue-100'
                    >
                      Add Payment Method
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* <!--
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  --> */}
          <div className={`${menuOpen ? 'block' : 'hidden'} lg:hidden`}>
            <div className='px-2 pt-2 pb-3'>
              <Link
                to={homeRoute}
                className='block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-800'
              >
                Dashboard
              </Link>
              {/* <Link
                to={analyticsRoute}
                className='block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-blue-100 bg-blue-600'
              >
                Analytics
              </Link> */}
              <a
                href='mailto:fritz@workhorsesw.com'
                target='_blank'
                rel='noreferrer'
                className='mt-1 block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-blue-100 hover:bg-blue-600'
              >
                Support
              </a>
            </div>
            <div className='pt-4 pb-3 border-t border-blue-800'>
              <div className='px-2'>
                <Link
                  to={settingsRoute}
                  className='block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-blue-100 hover:bg-blue-600'
                >
                  Account Settings{' '}
                </Link>
                <button
                  type='button'
                  onClick={() => firebase.auth().signOut()}
                  className='mt-1 block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-blue-100 hover:bg-blue-600'
                  role='menuitem'
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className='max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16'>
          <form>
            <div className='space-y-6'>
              <div>
                <h1 className='text-lg leading-6 font-medium text-gray-900'>Account Settings</h1>
              </div>
              <div>
                <label htmlFor='project_name' className='block text-sm font-medium text-gray-700'>
                  Business Name
                </label>
                <div className='mt-1'>
                  <input
                    placeholder="Mickey's Boxing Gym"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    type='text'
                    name='project_name'
                    id='project_name'
                    className='block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>
              <div>
                <label htmlFor='project_name' className='block text-sm font-medium text-gray-700'>
                  Google My Business Review Link
                </label>
                <div className='mt-1'>
                  <input
                    placeholder='https://MickeysGym.com'
                    value={reviewUrl}
                    onChange={(e) => setReviewUrl(e.target.value)}
                    type='text'
                    name='project_name'
                    id='project_name'
                    className='block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>
              <div>
                <label htmlFor='project_name' className='block text-sm font-medium text-gray-700'>
                  Your First & Last Name
                </label>
                <div className='mt-1'>
                  <input
                    placeholder='Rocky Balboa'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    type='text'
                    name='project_name'
                    id='project_name'
                    className='block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>
              <div>
                <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
                  Business Phone #
                </label>
                <div className='mt-1'>
                  <input
                    value={businessPhoneNumber}
                    onChange={(e) => setBusinessPhoneNumber(e.target.value)}
                    placeholder='+15559068422'
                    type='text'
                    name='project_name'
                    id='project_name'
                    className='block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>
              <div>
                <label htmlFor='project_name' className='block text-sm font-medium text-gray-700'>
                  Your Cell Phone # (For Optional Notifications)
                </label>
                <div className='mt-1'>
                  <input
                    placeholder='+15559068424'
                    value={notificationPhoneNumber}
                    onChange={(e) => setNotificationPhoneNumber(e.target.value)}
                    type='text'
                    name='project_name'
                    id='project_name'
                    className='block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>
              <div>
                <div className='mt-1 inline'>
                  <input
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    type='checkbox'
                    name='notificationsEnabled'
                    id='notificationsEnabled'
                    className='text-center mr-3 w-6 h-6 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-black rounded-md'
                  />
                </div>
                <label
                  htmlFor='notificationsEnabled'
                  className='inline text-sm font-medium text-gray-700'
                >
                  I Would Like To Be Notified if I get a 1-4 Star Review
                  <br />
                  <small>(Message & Data Rates May Apply)</small>
                </label>
              </div>
              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='inline-flex w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                >
                  Confirm Updated Settings
                </button>
              </div>
              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={() => firebase.auth().sendPasswordResetEmail(user.email)}
                  className='inline-flex w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                >
                  Send Password Reset Email
                </button>
              </div>{' '}
              {subscriptionData?.[0] && !loading && (
                <div className='flex justify-end'>
                  <button
                    type='button'
                    onClick={() => handleManageBilling()}
                    className='inline-flex w-full justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  >
                    Manage Billing
                  </button>
                </div>
              )}
              <p>
                If you'd like to change the default text messages FivesFilter sends to your
                customers, please{' '}
                <a
                  rel='noreferrer'
                  target='_blank'
                  className='text-blue-500'
                  href='mailto:fritz@workhorsesw.com?subject=Change%20Default%20Messages'
                >
                  Contact Support
                </a>
              </p>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};
