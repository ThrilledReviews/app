import { Transition } from '@headlessui/react';
import firebase from 'firebase/app';
import { FormEvent, useState } from 'react';
import ParsePhoneNumber, { AsYouType } from 'libphonenumber-js';

export const OnboardingPage = () => {
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [reviewUrl, setReviewUrl] = useState('');
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState('');
  const [shownBusinessPhoneNumber, setShownBusinessPhoneNumber] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationPhoneNumber, setNotificationPhoneNumber] = useState('');
  const [shownNotificationPhoneNumber, setShownNotificationPhoneNumber] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await firebase.functions().httpsCallable('onboardUser')({
      fullName,
      businessName,
      reviewUrl,
      businessPhoneNumber,
      notificationPhoneNumber,
      notificationsEnabled,
    });
    if (response.data.status !== 204) {
      setError(response.data.message);
    }
  };

  const handleBusinessPhoneNumberChange = (e: any) => {
    const value = new AsYouType('US').input(e.target.value);
    setBusinessPhoneNumber(ParsePhoneNumber(value, 'US')?.number as string);
    setShownBusinessPhoneNumber(value);
  };

  const handleNotificationPhoneNumberChange = (e: any) => {
    const value = new AsYouType('US').input(e.target.value);
    setNotificationPhoneNumber(ParsePhoneNumber(value, 'US')?.number as string);
    setShownNotificationPhoneNumber(value);
  };

  return (
    <div className='bg-blue-100'>
      <div className='max-w-6xl bg-gray-50 mx-auto p-4 sm:p-6 lg:p-8'>
        <form onSubmit={(e) => handleSubmit(e)} className='space-y-8 divide-y divide-gray-200'>
          <div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
            <div>
              <div>
                <div className='text-center mb-4 flex justify-center'>
                  <h1 className='text-3xl max-w-lg p-2 md:p-6 rounded-lg text-center font-medium text-gray-800'>
                    Thrilled Reviews Onboarding
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
                  Need help getting set up?{' '}
                  <span className='text-blue-500'>Email Us - support@thrilledreviews.com</span>
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
                    </label>
                    <div className='mt-1 sm:mt-0 sm:col-span-2'>
                      <div className='max-w-lg flex rounded-md shadow-sm'>
                        <input
                          required
                          value={shownBusinessPhoneNumber}
                          onChange={(e) => handleBusinessPhoneNumberChange(e)}
                          placeholder='(555) 898-4234'
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
                      Your Cell Phone #
                    </label>
                    <div className='mt-1 sm:mt-0 sm:col-span-2'>
                      <div className='max-w-lg flex rounded-md shadow-sm'>
                        <input
                          required
                          value={shownNotificationPhoneNumber}
                          onChange={(e) => handleNotificationPhoneNumberChange(e)}
                          placeholder='(555) 905-8234'
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
          </div>

          <div className='pt-5'>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='ml-3 inline-flex justify-center py-4 px-8 border border-transparent shadow-sm text-2xl font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Start My Trial!
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
                          Click here to visit Google's documentation
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className='mt-5 sm:mt-6'>
                    <button
                      onClick={() => setHelpModalOpen(false)}
                      type='button'
                      className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm'
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
