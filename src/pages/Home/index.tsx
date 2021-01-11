import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { analyticsRoute, homeRoute, settingsRoute } from '../../constants/routes';
import { MainListItem /*FeedbackRequest*/ } from './MainListItem';
import { /*AppEvent,*/ EventListItem } from './EventListItem';

export const HomePage = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user] = useAuthState(firebase.auth());

  const [userDoc] = useDocumentData(firebase.firestore().collection('users').doc(user?.uid)) as [
    any,
    any,
    any
  ];

  useEffect(() => {
    if (userDoc?.sentTestRequest === true) {
      setWelcomeModalOpen(false);
    } else {
      setWelcomeModalOpen(true);
    }
  }, [userDoc?.sentTestRequest]);

  const [feedbackRequests] = useCollectionData(
    firebase
      .firestore()
      .collection('users')
      .doc(user?.uid)
      .collection('feedbackRequests')
      .orderBy('createdDate', 'desc')
      .limit(10)
  ) as [any, boolean, any];

  const [events] = useCollectionData(
    firebase
      .firestore()
      .collection('users')
      .doc(user?.uid)
      .collection('events')
      .orderBy('createdDate', 'desc')
      .limit(10)
  ) as [any, boolean, any];

  // const [subscriptionData, loading] = useCollectionData(
  //   firebase
  //     .firestore()
  //     .collection('users')
  //     .doc(user?.uid)
  //     .collection('subscriptions')
  //     .where('status', 'in',  ['trialing','active'])
  // );

  const sendTestFeedbackRequest = async () => {
    setWelcomeModalOpen(false);
    if (userDoc?.sentTestRequest) return;
    await firebase.functions().httpsCallable('testFeedbackRequest')({});
  };

  const dismissWelcomeModal = () => {
    setWelcomeModalOpen(false);
    firebase
      .firestore()
      .collection('users')
      .doc(user?.uid)
      .set({ sentTestRequest: true }, { merge: true });
  };

  const handleRequestFeedback = () => {
    firebase.functions().httpsCallable('requestFeedback')({ customerName, customerPhone });
    setCustomerName('');
    setCustomerPhone('');
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
                      to={homeRoute}
                      className='px-3 py-2 rounded-md text-sm font-medium text-blue-200 hover:text-white'
                    >
                      Dashboard
                    </Link>
                    <Link
                      to={analyticsRoute}
                      className='px-3 py-2 rounded-md text-sm font-medium text-blue-200 hover:text-white'
                    >
                      Analytics
                    </Link>
                    <Link
                      to={settingsRoute}
                      className='px-3 py-2 rounded-md text-sm font-medium text-blue-200 hover:text-white'
                    >
                      Settings
                    </Link>
                    <a
                      href={`mailto:fritz@fivesfilter.com?subject=${encodeURIComponent(
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
                        {/* <Link
                          to={settingsRoute}
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          role='menuitem'
                        >
                          Account Settings
                        </Link> */}
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

          {/* <!--
        Mobile menu, toggle classes based on menu state.
  
        Menu open: "block", Menu closed: "hidden"
      --> */}
          <div className={`${menuOpen ? 'block' : 'hidden'} lg:hidden`}>
            <div className='px-2 pt-2 pb-3'>
              <Link
                to={homeRoute}
                className='block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-blue-100 bg-blue-600'
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
                href='mailto:fritz@fivesfilter.com'
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

        {/* <!-- 3 column wrapper --> */}
        <div className='flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex'>
          {/* <!-- Left sidebar & main wrapper --> */}
          <div className='flex-1 min-w-0 bg-white xl:flex'>
            {/* <!-- Account profile --> */}
            <div className='xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-white'>
              <div className='pl-4 pr-6 pb-6 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-0'>
                <div className='flex items-center justify-between'>
                  <div className='flex-1 space-y-8'>
                    <div className='space-y-2 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8'>
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

                        {/* {!subscriptionData?.[0] && !loading && (
                          <button
                            onClick={() => handleCheckout()}
                            type='button'
                            className='mt-3 inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-xl font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 xl:mt-3 xl:w-full'
                          >
                            Activate Your Account To Start Asking For Reviews!
                          </button>
                        )} */}
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
                    {/* {!subscriptionData?.[0] && !loading && (
                      <span className='text-gray-400'>(Example Data)</span>
                    )} */}
                  </h2>
                </div>
              </div>
              <ul className='relative z-0 divide-y divide-gray-200 border-b border-gray-200'>
                {userDoc?.testResultNumber && (
                  <MainListItem
                    feedbackRequest={{
                      source: 'Example Input',
                      customerName: userDoc?.fullName,
                      createdDate: userDoc?.testRequestCreatedDate,
                      customerPhone: userDoc?.notificationPhoneNumber,
                      resultNumber: userDoc?.testResultNumber,
                      reviewLinkClicked: userDoc?.testRedirectLinkClicked,
                    }}
                  />
                )}
                {/* {!subscriptionData?.[0] &&
                  !loading &&
                  demoFeedbackRequests?.map((request: any, index: number) => (
                    <MainListItem feedbackRequest={request} key={index} />
                  ))} */}
                {feedbackRequests?.map((request: any, index: number) => (
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
                  Activity Feed{' '}
                  {/* {!subscriptionData?.[0] && !loading && (
                    <span className='text-gray-400'>(Example Data)</span>
                  )} */}
                </h2>
              </div>
              <div>
                <ul className='divide-y divide-gray-200'>
                  {events?.map((event: any, index: number) => (
                    <EventListItem event={event} key={index} />
                  ))}
                  {/* {!subscriptionData?.[0] && userDoc?.testRedirectLinkClicked && !loading && (
                    <EventListItem
                      event={{
                        createdDate: userDoc?.testRedirectClickedDate,
                        event: 'review_link_clicked',
                        eventName: 'Review Link Clicked',
                        message: `${userDoc?.fullName} clicked your review link!`,
                        customerPhone: `${userDoc?.notificationPhoneNumber}`,
                      }}
                    />
                  )}
                  {!subscriptionData?.[0] && userDoc?.testReviewEvent && !loading && (
                    <EventListItem
                      event={{
                        createdDate: userDoc?.testReviewEventDate,
                        event: userDoc?.testReviewEvent,
                        eventName: userDoc.testReviewEventName,
                        message: userDoc.testReviewEventMessage,
                        customerPhone: userDoc?.notificationPhoneNumber,
                      }}
                    />
                  )}
                  {!subscriptionData?.[0] &&
                    !loading &&
                    demoEvents.map((event, index) => <EventListItem event={event} key={index} />)} */}
                </ul>
                <div className='py-4 text-sm border-t border-gray-200'>
                  {/* <Link
                    to={analyticsRoute}
                    className='text-blue-600 font-semibold hover:text-blue-900'
                  >
                    View Analytics <span aria-hidden='true'>&rarr;</span>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {welcomeModalOpen && (
        <>
          <div className='fixed z-10 inset-0 overflow-y-auto'>
            <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
              {/* <!--
        Background overlay, show/hide based on modal state.
  
        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      --> */}
              <Transition
                show={welcomeModalOpen}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
                  <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                </div>
              </Transition>

              {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
              {/* <span
                className='hidden sm:inline-block align-middle sm:h-screen'
                aria-hidden='true'
              >
                &#8203;
              </span> */}
              {/* <!--
        Modal panel, show/hide based on modal state.
  
        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      --> */}
              <Transition
                show={welcomeModalOpen}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <div
                  className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'
                  role='dialog'
                  aria-modal='true'
                  aria-labelledby='modal-headline'
                >
                  <div>
                    <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100'>
                      {/* <!-- Heroicon name: check --> */}
                      <svg
                        className='h-6 w-6 text-green-600'
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
                    <div className='mt-3 text-center sm:mt-5'>
                      <h3
                        className='text-lg leading-6 font-medium text-gray-900'
                        id='modal-headline'
                      >
                        Welcome! Here's how to get started:
                      </h3>
                      <div className='mt-2'>
                        <p className='text-sm mb-2 text-gray-500'>
                          You're currently looking at the demo version of FivesFilter. It's intended
                          to give you an idea of what FivesFilter does and how it's used.
                        </p>
                        <hr />
                        <p className='text-sm mt-2 text-gray-800'>
                          Try clicking the button below to send yourself a test feedback request
                          now! We'll use the cell phone # you entered earlier.
                        </p>
                        <p className='text-sm mt-2 text-gray-800'>
                          You'll see your name & phone number pop up under "Recent Feedback". Once
                          you've recieved the text, reply to it with only the number 5.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='mt-5 sm:mt-6'>
                    <button
                      onClick={() => sendTestFeedbackRequest()}
                      type='button'
                      className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-xl'
                    >
                      Send Me The Test
                      <br />
                      Feedback Request!
                    </button>
                    <div className='text-center text-xs mt-4'>
                      Message + Data Rates May Apply -{' '}
                      <span className='cursor-pointer' onClick={() => dismissWelcomeModal()}>
                        Skip Onboarding
                      </span>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </>
      )}
    </>
  );
};
