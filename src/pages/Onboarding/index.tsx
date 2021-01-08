import { Transition } from '@headlessui/react';
import firebase from 'firebase/app';
import { FormEvent, useState } from 'react';

export const OnboardingPage = () => {
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [reviewUrl, setReviewUrl] = useState('');
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationPhoneNumber, setNotificationPhoneNumber] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await firebase
      .functions()
      .httpsCallable('onboardUser')({
        fullName,
        businessName,
        reviewUrl,
        businessPhoneNumber,
        notificationPhoneNumber,
        notificationsEnabled,
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className='bg-blue-100'>
      <div className='max-w-6xl bg-gray-50 mx-auto p-4 sm:p-6 lg:p-8'>
        <form onSubmit={(e) => handleSubmit(e)} className='space-y-8 divide-y divide-gray-200'>
          <div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
            <div>
              <div>
                <div className='text-center mb-4 sm:mb-6 lg:mb-8 flex justify-center'>
                  <h1 className='text-3xl max-w-lg p-6 rounded-lg text-center font-medium text-white bg-blue-500'>
                    FivesFilter Setup
                  </h1>
                </div>
                <hr className='p-2' />
                <h3 className='text-lg  font-medium text-gray-900'>
                  Personal & Business Information
                </h3>
                <p className='mt-2 max-w-2xl text-sm text-gray-500'>
                  Just a few quick questions to get you started
                </p>
                <p className='mt-2 max-w-2xl text-sm text-gray-500'>
                  Need Help Getting Set Up?{' '}
                  <a
                    href='mailto:fritz@workhorsesw.com'
                    target='_blank'
                    rel='noreferrer'
                    className='text-blue-500'
                  >
                    Send us an email
                  </a>
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
                  <label
                    onClick={() => setHelpModalOpen(true)}
                    htmlFor='reviewUrl'
                    className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 cursor-pointer'
                  >
                    Your Business's Review Page Full URL{' '}
                    <span className='text-blue-500'>(Help)</span>
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
                      Your Business's Phone Number
                      <br />
                      <span className='text-gray-500'>(+1 followed by ten more digits)</span>
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
                <div className='mt-6 sm:mt-5 space-y-6 sm:space-y-5 sm:border-t sm:border-gray-200 sm:pt-5'>
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
                      Send me a text if I get a 1-4 star response
                    </label>
                  </div>
                  <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                    <label
                      htmlFor='notificationPhoneNumber'
                      className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                    >
                      Your Cell Phone #<br />
                      <span className='text-gray-500'>
                        (For optional notifications - Starts with +1)
                      </span>
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
              <div className='text-center'>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>Extra Terms Of Use</h3>
                <p className='mt-1 text-sm text-gray-500'>
                  There are some important legal requirements for using this service that we need
                  you to understand.
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
                                className='focus:ring-blue-500 h-4 w-4 text-black border-gray-500 rounded'
                              />
                            </div>
                            <div className='ml-3 text-sm'>
                              <label htmlFor='comments' className='font-medium text-red-700'>
                                No Promotional Messages
                              </label>
                              <p className='text-gray-500'>
                                I will NEVER promote, sell, or market anything whatsoever with the
                                FivesFilter service. I will send transactional messages ONLY.
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
                                  className='focus:ring-blue-500 h-4 w-4 text-black border-gray-500 rounded'
                                />
                              </div>
                              <div className='ml-3 text-sm'>
                                <label htmlFor='candidates' className='font-medium text-red-700'>
                                  Recent, Express Consent
                                </label>
                                <p className='text-gray-500'>
                                  I will ONLY use the FivesFilter service to contact existing
                                  customers who have knowingly given me their phone #, and whom I
                                  have served in the last 3 days.
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
                                  className='focus:ring-blue-500 h-4 w-4 text-black border-gray-500 rounded'
                                />
                              </div>
                              <div className='ml-3 text-sm'>
                                <label htmlFor='offers' className='font-medium text-red-700'>
                                  Only For Soliciting Feedback
                                </label>
                                <p className='text-gray-500'>
                                  I will ONLY use the FivesFilter service to solicit customer
                                  feedback & reviews, NEVER for any other purpose
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
            <div className='flex justify-center'>
              <button
                type='submit'
                className='ml-3 inline-flex justify-center py-4 px-8 border border-transparent shadow-sm text-2xl font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Start The Demo!
              </button>
            </div>
            <p className='text-red-500'>{error}</p>
          </div>
        </form>
      </div>
      {helpModalOpen && (
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
                show={helpModalOpen}
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
                className='hidden inline-block align-middle sm:h-screen'
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
                show={helpModalOpen}
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
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M5 13l4 4L19 7'
                        />
                      </svg>
                    </div>
                    <div className='mt-3 text-center sm:mt-5'>
                      <h3
                        className='text-lg leading-6 font-medium text-gray-900'
                        id='modal-headline'
                      >
                        Where to find your Google My Business Review Link
                      </h3>
                      <div className='mt-2'>
                        <p className='text-sm text-gray-500'>
                          On a computer, go to your Google My Business Page. Once you've signed in,
                          go to your homepage, click the "Get More Reviews" card and copy the url
                          provided and paste it in the "Review URL" section.
                        </p>
                        <p className='text-sm mt-2 text-gray-500'>
                          On a phone, install then open up the Google My Business App. Tap
                          "Customers", then "Reviews". In the top right, click "Share". Create a
                          short name, then copy the link and paste in in the "Review URL" section.
                        </p>
                        <a
                          className='text-sm text-blue-500'
                          target='_blank'
                          rel='noreferrer'
                          href='https://support.google.com/business/answer/7035772?hl=en'
                        >
                          Click to visit Google's Article About this
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className='mt-5 sm:mt-6'>
                    <button
                      onClick={() => setHelpModalOpen(false)}
                      type='button'
                      className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
                    >
                      Go Back to Setup
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
