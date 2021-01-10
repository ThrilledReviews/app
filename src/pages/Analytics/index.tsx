import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import { homeRoute, analyticsRoute, settingsRoute } from '../../constants/routes';

export const AnalyticsPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showAllTime, setShowAllTime] = useState(true);
  const [showLastWeek, setShowLastWeek] = useState(false);
  const [showLastMonth, setShowLastMonth] = useState(false);
  const [user] = useAuthState(firebase.auth());

  const [feedback] = useCollectionData(
    firebase.firestore().collection('users').doc(user.uid).collection('feedbackRequests')
  ) as any[];

  const lastWeek = new Date(Date.now() - 24 * 7 * 60 * 60 * 1000);
  const lastMonth = new Date(Date.now() - 24 * 30 * 60 * 60 * 1000);

  const allTimeRequests: any[] = feedback?.filter(
    (feedbackRequest: any) => typeof feedbackRequest.resultNumber === 'number'
  );

  const lastWeekRequests = allTimeRequests?.filter(
    (request: any) => request.createdDate?.toDate() > lastWeek
  );

  const lastMonthRequests = allTimeRequests?.filter(
    (request: any) => request.createdDate?.toDate() > lastMonth
  );

  const allTimeFeedback: any[] = feedback?.filter(
    (feedbackRequest: any) =>
      typeof feedbackRequest.resultNumber === 'number' && feedbackRequest.resultNumber !== -1
  );

  const lastWeekFeedback = allTimeFeedback?.filter(
    (feedback: any) => feedback.createdDate?.toDate() > lastWeek
  );
  const lastMonthFeedback = allTimeFeedback?.filter(
    (feedback: any) => feedback.createdDate?.toDate() > lastMonth
  );

  const allTimeRequestCount = allTimeRequests?.length;
  const lastWeekRequestCount = lastWeekRequests?.length;
  const lastMonthRequestCount = lastMonthRequests?.length;

  const allTimeResponseCount = allTimeFeedback?.length;
  const lastWeekResponseCount = lastWeekFeedback?.length;
  const lastMonthResponseCount = lastMonthFeedback?.length;

  const allTimeReviewPct = Math.round((allTimeResponseCount / allTimeRequestCount) * 1000) / 10;
  const lastWeekReviewPct = Math.round((lastWeekResponseCount / lastWeekRequestCount) * 1000) / 10;
  const lastMonthReviewPct =
    Math.round((lastMonthResponseCount / lastMonthRequestCount) * 1000) / 10;

  const allTimeFiveStars = allTimeFeedback?.filter(
    (scoredFeedback: any) => scoredFeedback.resultNumber === 5
  )?.length;
  const lastWeekFiveStars = lastWeekFeedback?.filter(
    (scoredFeedback: any) => scoredFeedback.resultNumber === 5
  )?.length;
  const lastMonthFiveStars = lastMonthFeedback?.filter(
    (scoredFeedback: any) => scoredFeedback.resultNumber === 5
  )?.length;

  const allTimeFiveStarPct =
    Math.round(
      (allTimeFeedback?.filter((scoredFeedback: any) => scoredFeedback.resultNumber === 5)?.length /
        (allTimeFeedback?.length === 0 ? 1 : allTimeFeedback?.length)) *
        100 *
        10
    ) / 10;

  const lastWeekFiveStarPct =
    Math.round(
      (lastWeekFeedback?.filter((scoredFeedback: any) => scoredFeedback.resultNumber === 5)
        ?.length /
        (lastWeekFeedback?.length === 0 ? 1 : lastWeekFeedback?.length)) *
        100 *
        10
    ) / 10;

  const lastMonthFiveStarPct =
    Math.round(
      (lastMonthFeedback?.filter((scoredFeedback: any) => scoredFeedback.resultNumber === 5)
        ?.length /
        (lastMonthFeedback?.length === 0 ? 1 : lastMonthFeedback?.length)) *
        100 *
        10
    ) / 10;

  const allTimeLinkClicks = allTimeFeedback?.filter(
    (scoredFeedback: any) => scoredFeedback?.reviewLinkClicked === true
  )?.length;

  const lastWeekLinkClicks = lastWeekFeedback?.filter(
    (scoredFeedback: any) => scoredFeedback?.reviewLinkClicked === true
  )?.length;

  const lastMonthLinkClicks = lastMonthFeedback?.filter(
    (scoredFeedback: any) => scoredFeedback?.reviewLinkClicked === true
  )?.length;

  const allTimeClickPct = Math.round((allTimeLinkClicks / allTimeRequestCount) * 1000) / 10;
  const lastWeekClickPct = Math.round((lastWeekLinkClicks / lastWeekRequestCount) * 1000) / 10;
  const lastMonthClickPct = Math.round((lastMonthLinkClicks / lastMonthRequestCount) * 1000) / 10;

  return (
    <>
      <div className='relative flex flex-col'>
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
      </div>

      <div className='bg-gray-100 min-h-screen -mt-16 pt-16'>
        <h1 className='text-3xl text-center mt-2'>Feedback & Review Analytics</h1>
        <h4 className='text-lg text-center mt-8 mb-2'>Timeframe</h4>
        <fieldset className='flex justify-center'>
          <>
            <div className='bg-white flex'>
              {/* <!-- On: "bg-blue-50 border-blue-200 z-10", Off: "border-gray-200" --> */}
              <div
                className='relative border border-gray-500 rounded-bl-md rounded-tl-md p-4 flex'
                onClick={() => {
                  setShowLastWeek(true);
                  setShowLastMonth(false);
                  setShowAllTime(false);
                }}
              >
                <div className='flex items-center h-5'>
                  <input
                    readOnly
                    id='settings-option-0'
                    name='privacy_setting'
                    type='radio'
                    className='focus:ring-blue-500 h-4 w-4 text-blue-600 cursor-pointer border-gray-300'
                    checked={showLastWeek}
                  />
                </div>
                <label htmlFor='settings-option-0' className='ml-3 flex flex-col cursor-pointer'>
                  {/* <!-- On: "text-blue-900", Off: "text-gray-900" --> */}
                  <span className='block text-sm font-medium'>Last 7 Days</span>
                  {/* <!-- On: "text-blue-700", Off: "text-gray-500" --> */}
                </label>
              </div>

              {/* <!-- On: "bg-blue-50 border-blue-200 z-10", Off: "border-gray-200" --> */}
              <div
                className='relative border border-gray-500 p-4 flex'
                onClick={() => {
                  setShowLastWeek(false);
                  setShowLastMonth(true);
                  setShowAllTime(false);
                }}
              >
                <div className='flex items-center h-5'>
                  <input
                    readOnly
                    id='settings-option-1'
                    name='privacy_setting'
                    type='radio'
                    className='focus:ring-blue-500 h-4 w-4 text-blue-600 cursor-pointer border-gray-300'
                    checked={showLastMonth}
                  />
                </div>
                <label htmlFor='settings-option-1' className='ml-3 flex flex-col cursor-pointer'>
                  {/* <!-- On: "text-blue-900", Off: "text-gray-900" --> */}
                  <span className='block text-sm font-medium'>Last 30 Days</span>
                  {/* <!-- On: "text-blue-700", Off: "text-gray-500" --> */}
                </label>
              </div>

              {/* <!-- On: "bg-blue-50 border-blue-200 z-10", Off: "border-gray-200" --> */}
              <div
                className='relative border border-gray-500 rounded-tr-md rounded-br-md p-4 flex'
                onClick={() => {
                  setShowLastWeek(false);
                  setShowLastMonth(false);
                  setShowAllTime(true);
                }}
              >
                <div className='flex items-center h-5'>
                  <input
                    readOnly
                    id='settings-option-2'
                    name='privacy_setting'
                    type='radio'
                    className='focus:ring-blue-500 h-4 w-4 text-blue-600 cursor-pointer border-gray-300'
                    checked={showAllTime}
                  />
                </div>
                <label htmlFor='settings-option-2' className='ml-3 flex flex-col cursor-pointer'>
                  {/* <!-- On: "text-blue-900", Off: "text-gray-900" --> */}
                  <span className='block text-sm font-medium'>All Time</span>
                </label>
              </div>
            </div>
          </>
        </fieldset>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* <!-- We've used 3xl here, but feel free to try other max-widths based on your needs --> */}
          <div className='max-w-5xl mx-auto'>
            <div className='my-8'>
              <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
                  {/* <!-- Card --> */}
                  <div className='bg-white overflow-hidden shadow-lg rounded-lg'>
                    <div className='p-5'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            className='h-6 w-6 text-gray-900'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M7 20l4-16m2 16l4-16M6 9h14M4 15h14'
                            />
                          </svg>
                        </div>
                        <div className='ml-5 w-0 flex-1'>
                          <dl>
                            <dt className='text-sm font-medium text-gray-500 truncate'>
                              Total Requests
                            </dt>
                            <dd>
                              <div className='text-lg font-medium text-gray-900'>
                                {showLastWeek
                                  ? lastWeekRequestCount
                                  : showLastMonth
                                  ? lastMonthRequestCount
                                  : allTimeRequestCount}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>{' '}
                  <div className='bg-white overflow-hidden shadow-lg rounded-lg'>
                    <div className='p-5'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            className='h-6 w-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3'
                            />
                          </svg>
                        </div>
                        <div className='ml-5 w-0 flex-1'>
                          <dl>
                            <dt className='text-sm font-medium text-gray-500 truncate'>
                              Total Reviews
                            </dt>
                            <dd>
                              <div className='text-lg font-medium text-gray-900'>
                                {showLastWeek
                                  ? lastWeekResponseCount
                                  : showLastMonth
                                  ? lastMonthResponseCount
                                  : allTimeResponseCount}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>{' '}
                  <div className='bg-white overflow-hidden shadow-lg rounded-lg'>
                    <div className='p-5'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            className='h-6 w-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                            />
                          </svg>
                        </div>
                        <div className='ml-5 w-0 flex-1'>
                          <dl>
                            <dt className='text-sm font-medium text-gray-500 truncate'>
                              5-Star Reviews
                            </dt>
                            <dd>
                              <div className='text-lg font-medium text-gray-900'>
                                {showLastWeek
                                  ? lastWeekFiveStars
                                  : showLastMonth
                                  ? lastMonthFiveStars
                                  : allTimeFiveStars}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>{' '}
                  <div className='bg-white overflow-hidden shadow-lg rounded-lg'>
                    <div className='p-5'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            className='h-6 w-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
                            />
                          </svg>
                        </div>
                        <div className='ml-5 w-0 flex-1'>
                          <dl>
                            <dt className='text-sm font-medium text-gray-500 truncate'>
                              Review Link Clicks
                            </dt>
                            <dd>
                              <div className='text-lg font-medium text-gray-900'>
                                {showLastWeek
                                  ? lastWeekLinkClicks
                                  : showLastMonth
                                  ? lastMonthLinkClicks
                                  : allTimeLinkClicks}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>{' '}
                  <div className='bg-white overflow-hidden shadow-lg rounded-lg'>
                    <div className='p-5'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            className='h-6 w-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
                            />
                          </svg>
                        </div>
                        <div className='ml-5 w-0 flex-1'>
                          <dl>
                            <dt className='text-sm font-medium text-gray-500 truncate'>
                              Clicks / Requests
                            </dt>
                            <dd>
                              <div className='text-lg font-medium text-gray-900'>
                                {showLastWeek
                                  ? lastWeekClickPct
                                  : showLastMonth
                                  ? lastMonthClickPct
                                  : allTimeClickPct}
                                %
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>{' '}
                  <div className='bg-white overflow-hidden shadow-lg rounded-lg'>
                    <div className='p-5'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            className='h-6 w-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3'
                            />
                          </svg>
                        </div>
                        <div className='ml-5 w-0 flex-1'>
                          <dl>
                            <dt className='text-sm font-medium text-gray-500 truncate'>
                              Reviews / Requests
                            </dt>
                            <dd>
                              <div className='text-lg font-medium text-gray-900'>
                                {showLastWeek
                                  ? lastWeekReviewPct
                                  : showLastMonth
                                  ? lastMonthReviewPct
                                  : allTimeReviewPct}
                                %
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>{' '}
                  <div className='bg-white overflow-hidden shadow-lg rounded-lg'>
                    <div className='p-5'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            className='h-6 w-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                            />
                          </svg>
                        </div>
                        <div className='ml-5 w-0 flex-1'>
                          <dl>
                            <dt className='text-sm font-medium text-gray-500 truncate'>
                              5-Stars / Reviews
                            </dt>
                            <dd>
                              <div className='text-lg font-medium text-gray-900'>
                                {showLastWeek
                                  ? lastWeekFiveStarPct
                                  : showLastMonth
                                  ? lastMonthFiveStarPct
                                  : allTimeFiveStarPct}
                                %
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>{' '}
                  <div className='bg-white overflow-hidden shadow-lg rounded-lg'>
                    <div className='p-5'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            className='h-6 w-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
                            />
                          </svg>
                        </div>
                        <div className='ml-5 w-0 flex-1'>
                          <dl>
                            <dt className='text-sm font-medium text-gray-500 truncate'>
                              Clicks / 5-Stars
                            </dt>
                            <dd>
                              <div className='text-lg font-medium text-gray-900'>
                                {showLastWeek
                                  ? lastWeekFiveStarPct
                                  : showLastMonth
                                  ? lastMonthFiveStarPct
                                  : allTimeFiveStarPct}
                                %
                              </div>
                            </dd>
                          </dl>
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
    </>
  );
};
