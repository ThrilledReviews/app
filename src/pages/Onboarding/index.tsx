import firebase from 'firebase/app';
import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

export const OnboardingPage = () => {
  const history = useHistory();
  const [error, setError] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [reviewUrl, setReviewUrl] = useState('');
  const [areaCode, setAreaCode] = useState('');
  const [notificationPhoneNumber, setNotificationPhoneNumber] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(areaCode);
    firebase.functions().httpsCallable('lol');
  };

  history.replace('/onboarding');

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6 lg:p-8'>
      <form onSubmit={(e) => handleSubmit(e)} className='space-y-8 divide-y divide-gray-200'>
        <div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
          <div>
            <div>
              <h1 className='text-3xl pb-8 text-center font-medium text-gray-900'>
                FivesFilter Setup
              </h1>
              <hr className='p-2' />
              <h3 className='text-lg  font-medium text-gray-900'>
                Personal & Business Information
              </h3>
              <p className='mt-2 max-w-2xl text-sm text-gray-500'>
                Just a few quick questions to get you started
              </p>
            </div>

            <div className='mt-6 sm:mt-5 space-y-6 sm:space-y-5'>
              <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                <label
                  htmlFor='fullName'
                  className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                >
                  Your First & Last Name
                </label>
                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                  <div className='max-w-lg flex rounded-md shadow-sm'>
                    <input
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder='Jerry Goodman'
                      type='text'
                      autoComplete='fullName'
                      className='flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-md sm:text-sm border-gray-300'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-6 sm:mt-5 space-y-6 sm:space-y-5'>
              <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                <label className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                  Name Of Your Business
                </label>
                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                  <div className='max-w-lg flex rounded-md shadow-sm'>
                    <input
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder='ABC Plumbing LLC'
                      type='text'
                      className='flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-md sm:text-sm border-gray-300'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-6 sm:mt-5 space-y-6 sm:space-y-5'>
              <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                <label className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                  Business Username (Letters, Numbers and Underscores)
                </label>
                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                  <div className='max-w-lg flex rounded-md shadow-sm'>
                    <input
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder='abc_plumbing'
                      type='text'
                      autoComplete='businessUsername'
                      className='flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-md sm:text-sm border-gray-300'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-6 sm:mt-5 space-y-6 sm:space-y-5'>
              <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                <label
                  htmlFor='reviewUrl'
                  className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                >
                  Review Page Full URL{' '}
                  <a
                    href='https://fivesfilter.com/support/reviewPages'
                    target='_blank'
                    rel='noReferrer'
                    className='text-blue-500'
                  >
                    (Help)
                  </a>
                </label>
                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                  <div className='max-w-lg flex rounded-md shadow-sm'>
                    <input
                      required
                      value={reviewUrl}
                      onChange={(e) => setReviewUrl(e.target.value)}
                      placeholder='https://g.page/ABCPlumbingWaco/review'
                      type='text'
                      id='reviewUrl'
                      className='flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-md sm:text-sm border-gray-300'
                    />
                  </div>
                </div>
              </div>

              <div className='mt-6 sm:mt-5 space-y-6 sm:space-y-5'>
                <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                  <label className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
                    Your Business Phone's Area Code
                  </label>
                  <div className='mt-1 sm:mt-0 sm:col-span-2'>
                    <div className='max-w-lg flex rounded-md shadow-sm'>
                      <input
                        required
                        value={areaCode}
                        onChange={(e) => setAreaCode(e.target.value)}
                        placeholder='559'
                        type='number'
                        autoComplete='businessUsername'
                        className='flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-md sm:text-sm border-gray-300'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-6 sm:mt-5 space-y-6 sm:space-y-5'>
                <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                  <label
                    htmlFor='username'
                    className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                  >
                    Your Cell Phone # (We won't spam you!)
                  </label>
                  <div className='mt-1 sm:mt-0 sm:col-span-2'>
                    <div className='max-w-lg flex rounded-md shadow-sm'>
                      <input
                        value={notificationPhoneNumber}
                        onChange={(e) => setNotificationPhoneNumber(e.target.value)}
                        placeholder='+15559058234'
                        type='text'
                        autoComplete='phone'
                        className='flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-md sm:text-sm border-gray-300'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5'>
            <div>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>Terms Of Use</h3>
              <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                There are some important legal requirements for using this service that we need you
                to understand.
                <br />
                Select each box to confirm that you've read and understand the requirements.
              </p>
            </div>
            <div className='space-y-6 sm:space-y-5 divide-y divide-gray-200'>
              <div className='pt-6 sm:pt-5'>
                <div role='group' aria-labelledby='label-email'>
                  <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline'>
                    <div>
                      <div
                        className='text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700'
                        id='label-email'
                      >
                        By Email
                      </div>
                    </div>
                    <div className='mt-4 sm:mt-0 sm:col-span-2'>
                      <div className='max-w-lg space-y-4'>
                        <div className='relative flex items-start'>
                          <div className='flex items-center h-5'>
                            <input
                              required
                              id='comments'
                              name='comments'
                              type='checkbox'
                              className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded'
                            />
                          </div>
                          <div className='ml-3 text-sm'>
                            <label htmlFor='comments' className='font-medium text-red-700'>
                              No Promotional Messages
                            </label>
                            <p className='text-gray-500'>
                              NEVER promote, sell, or market anything whatsoever with our service
                              <br />
                              Transactional Messages ONLY. Not sure?{' '}
                              <a className='text-blue-500' href='mailto:fritz@FivesFilter.com'>
                                Ask us.
                              </a>
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className='relative flex items-start'>
                            <div className='flex items-center h-5'>
                              <input
                                required
                                id='candidates'
                                name='candidates'
                                type='checkbox'
                                className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded'
                              />
                            </div>
                            <div className='ml-3 text-sm'>
                              <label htmlFor='candidates' className='font-medium text-red-700'>
                                No Cold Outreach
                              </label>
                              <p className='text-gray-500'>
                                You must ONLY use our service to contact existing customers who have
                                knowingly given you their phone #
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className='relative flex items-start'>
                            <div className='flex items-center h-5'>
                              <input
                                required
                                id='offers'
                                name='offers'
                                type='checkbox'
                                className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded'
                              />
                            </div>
                            <div className='ml-3 text-sm'>
                              <label htmlFor='offers' className='font-medium text-red-700'>
                                Only For Soliciting Feedback
                              </label>
                              <p className='text-gray-500'>
                                Our service must ONLY be used to solicit customer feedback & reviews
                                - NEVER for any other purpose
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className='text-center text-red-500 font-bold'>
                          Breaking These Terms Means You're Breaking Federal Law
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='pt-5'>
          <div className='flex justify-end'>
            <button
              type='button'
              className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
