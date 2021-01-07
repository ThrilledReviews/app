import firebase from 'firebase/app';
import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { homeRoute } from '../../constants/routes';

export const OnboardingPage = () => {
  const history = useHistory();
  const [error, setError] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [reviewUrl, setReviewUrl] = useState('');
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState('');
  const [notificationPhoneNumber, setNotificationPhoneNumber] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    firebase
      .functions()
      .httpsCallable('onboardUser')({
        fullName,
        username,
        businessName,
        reviewUrl,
        businessPhoneNumber,
        notificationPhoneNumber,
      })
      .then(() => {
        history.replace(homeRoute);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

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
                  Your Legal First & Last Name
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
                  Your Business's Review Page Full URL{' '}
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
                    Your Business's Phone Number (Starts with +1)
                  </label>
                  <div className='mt-1 sm:mt-0 sm:col-span-2'>
                    <div className='max-w-lg flex rounded-md shadow-sm'>
                      <input
                        required
                        value={businessPhoneNumber}
                        onChange={(e) => setBusinessPhoneNumber(e.target.value)}
                        placeholder='+15558984234'
                        type='text'
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
                    Your Cell Phone # (Starts with +1)
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
                    <div />
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
                              I will NEVER promote, sell, or market anything whatsoever with the
                              service.
                              <br />I will send transactional messages ONLY.
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
                                Recent, Express Consent
                              </label>
                              <p className='text-gray-500'>
                                I will ONLY use the service to contact existing customers who have
                                knowingly given me their phone #, and who I served in the last week.
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
                                I will ONLY use the service to solicit customer feedback & reviews,{' '}
                                <br />
                                NEVER for any other purpose
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className='text-center text-red-500 font-bold'>
                          Breaking These Terms Could Mean Breaking Federal Law
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
          <p className='text-red-500'>{error}</p>
        </div>
      </form>
    </div>
  );
};
