import firebase from 'firebase/app';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { Stripe } from '@stripe/stripe-js';
import { accountSettingsRoute, analyticsRoute, homeRoute } from '../../constants/routes';
import { MainListItem, FeedbackRequest } from './MainListItem';
import { useStripe } from '@stripe/react-stripe-js';

export const HomePage = () => {
  const stripe = useStripe() as Stripe;
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user] = useAuthState(firebase.auth());

  const [userDoc] = useDocumentData(firebase.firestore().collection('users').doc(user?.uid)) as [
    any,
    any,
    any
  ];

  const [feedbackRequests] = useCollectionData(
    firebase.firestore().collection('users').doc(user?.uid).collection('feedbackRequests').limit(10)
  ) as [any, boolean, any];

  const [subscriptionData] = useCollectionData(
    firebase
      .firestore()
      .collection('users')
      .doc(user?.uid)
      .collection('subscriptions')
      .where('status', '==', 'active')
  );

  const demoFeedbackRequests: FeedbackRequest[] = [
    {
      customerName: 'Joey Valentino',
      phoneNumber: '+15558859234',
      reviewLinkClicked: true,
      resultNumber: 5,
      createdDate: firebase.firestore && new firebase.firestore.Timestamp(Date.now() / 1000, 0),
    },
    {
      customerName: 'Quinn Romanov',
      phoneNumber: '+15552359234',
      reviewLinkClicked: false,
      resultNumber: 3,
      createdDate: firebase.firestore && new firebase.firestore.Timestamp(Date.now() / 1000, 0),
    },
    {
      customerName: 'Janet Koch',
      phoneNumber: '+15555232234',
      reviewLinkClicked: false,
      resultNumber: -1,
      createdDate: firebase.firestore && new firebase.firestore.Timestamp(Date.now() / 1000, 0),
    },
    {
      customerName: 'Morpheus Fishburne',
      phoneNumber: '+15558859234',
      reviewLinkClicked: false,
      resultNumber: 5,
      createdDate: firebase.firestore && new firebase.firestore.Timestamp(Date.now() / 1000, 0),
    },
    {
      customerName: 'Neo Reeves',
      phoneNumber: '+15228859234',
      reviewLinkClicked: false,
      resultNumber: 5,
      createdDate: firebase.firestore && new firebase.firestore.Timestamp(Date.now() / 1000, 0),
    },
  ];

  const handleRequestFeedback = () => {
    firebase.functions().httpsCallable('requestFeedback')({ customerName, customerPhone });
  };

  const handleCheckout = async () => {
    const docRef = await firebase
      .firestore()
      .collection('users')
      .doc(user?.uid)
      .collection('checkouts')
      .add({
        quantity: 0,
        price: 'price_1I6pL4LjqDOPvfebwGmVyIIi',
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
      <div className='fixed top-0 left-0 w-1/2 h-full bg-white' aria-hidden='true'></div>
      <div className='fixed top-0 right-0 w-1/2 h-full bg-gray-50' aria-hidden='true'></div>
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
                      to={analyticsRoute}
                      className='px-3 py-2 rounded-md text-sm font-medium text-blue-200 hover:text-white'
                    >
                      Analytics
                    </Link>
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
                          to={accountSettingsRoute}
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
          {!subscriptionData?.[0] && (
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
              <Link
                to={analyticsRoute}
                className='block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-blue-100 bg-blue-600'
              >
                Analytics
              </Link>
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
                  to={accountSettingsRoute}
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

        {/* <!-- 3 column wrapper --> */}
        <div className='flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex'>
          {/* <!-- Left sidebar & main wrapper --> */}
          <div className='flex-1 min-w-0 bg-white xl:flex'>
            {/* <!-- Account profile --> */}
            <div className='xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-white'>
              <div className='pl-4 pr-6 pb-6 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-0'>
                <div className='flex items-center justify-between'>
                  <div className='flex-1 space-y-8'>
                    <div className='space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8'>
                      {/* <!-- Profile --> */}
                      <div className='hidden sm:flex items-center space-x-3'>
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
                        <div className='space-y-1'>
                          <div className='text-sm font-medium text-gray-900'>
                            {userDoc?.fullName}
                          </div>
                          <span className='group flex items-center space-x-2.5'>
                            <span className='text-sm text-gray-500 font-medium'>
                              {userDoc?.businessName}
                            </span>
                          </span>
                        </div>
                      </div>
                      {/* <!-- Action buttons --> */}
                      <div className='flex flex-col sm:flex-row xl:flex-col'>
                        <h3 className='text-lg text-center mb-2'>Request Feedback</h3>
                        <hr className='border border-gray-600' />
                        {subscriptionData?.[0] && (
                          <>
                            <div className='mt-3 ml-2 sm:ml-0'>
                              <label className='text-sm'>Customer Phone</label>
                              <input
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                type='text'
                                placeholder='+15558982222'
                                className='inline-flex items-center justify-center px-4 py-2 ml-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 xl:ml-0 xl:w-full'
                              />
                            </div>
                            <div className='mt-3 ml-2 sm:ml-0'>
                              <label className='text-sm'>Customer Name</label>
                              <input
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                type='text'
                                placeholder='Johnathan Doe'
                                className='inline-flex items-center justify-center px-4 py-2 pr-5 ml-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 xl:ml-0 sm:mt-0 xl:mt-0 xl:w-full'
                              />
                            </div>
                            <button
                              onClick={() => handleRequestFeedback()}
                              type='button'
                              className='mt-3 inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 xl:mt-3 xl:w-full'
                            >
                              Send Feedback Request
                            </button>
                          </>
                        )}
                        {!subscriptionData?.[0] && (
                          <button
                            onClick={() => handleCheckout()}
                            type='button'
                            className='mt-3 inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 xl:mt-3 xl:w-full'
                          >
                            Activate Your Account To Get Started!
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Projects List --> */}
            <div className='bg-white lg:min-w-0 lg:flex-1 overflow-scroll h-full'>
              <div className='pl-4 pr-6 pt-4 pb-4 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0'>
                <div className='flex items-center'>
                  <h2 className='flex-1 text-lg font-medium'>
                    Recent Feedback Requests{' '}
                    {!subscriptionData?.[0] && (
                      <span className='text-gray-400'>(Example Data)</span>
                    )}
                  </h2>
                </div>
              </div>
              <ul className='relative z-0 divide-y divide-gray-200 border-b border-gray-200'>
                {!subscriptionData?.[0] &&
                  demoFeedbackRequests?.map((request: any, index: number) => (
                    <MainListItem feedbackRequest={request} key={index} />
                  ))}
                {subscriptionData?.[0] &&
                  feedbackRequests?.map((request: any, index: number) => (
                    <MainListItem feedbackRequest={request} key={index} />
                  ))}
              </ul>
            </div>
          </div>
          {/* <!-- analytics feed --> */}
          <div className='bg-gray-50 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0'>
            <div className='pl-6 lg:w-80'>
              <div className='pt-6 pb-2'>
                <h2 className='text-sm font-semibold'>
                  Events Feed{' '}
                  {!subscriptionData?.[0] && <span className='text-gray-400'>(Example Data)</span>}
                </h2>
              </div>
              <div>
                <ul className='divide-y divide-gray-200'>
                  <li className='py-4'>
                    <div className='flex space-x-3'>
                      <div className='flex-1 space-y-1'>
                        <div className='flex items-center justify-between'>
                          <h3 className='text-sm font-medium'>Review Link Clicked</h3>
                          <p className='text-sm text-gray-500'>{new Date().toLocaleDateString()}</p>
                        </div>
                        <p className='text-sm text-gray-500'>Ted Gacy Clicked Your Review Link</p>
                      </div>
                    </div>
                  </li>{' '}
                  <li className='py-4'>
                    <div className='flex space-x-3'>
                      <div className='flex-1 space-y-1'>
                        <div className='flex items-center justify-between'>
                          <h3 className='text-sm font-medium'>5 Star Review</h3>
                          <p className='text-sm text-gray-500'>{new Date().toLocaleDateString()}</p>
                        </div>
                        <p className='text-sm text-gray-500'>Ted Gacy Gave You Five Stars</p>
                      </div>
                    </div>
                  </li>
                  {/* <!-- More items... --> */}
                </ul>
                <div className='py-4 text-sm border-t border-gray-200'>
                  <Link
                    to={analyticsRoute}
                    className='text-blue-600 font-semibold hover:text-blue-900'
                  >
                    View Analytics <span aria-hidden='true'>&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
