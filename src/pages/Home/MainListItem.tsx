import firebase from 'firebase/app';

export interface FeedbackRequest {
  customerName: string;
  customerPhone: string;
  resultNumber: number;
  reviewLinkClicked: boolean;
  createdDate: firebase.firestore.Timestamp;
  source: string;
}

export const MainListItem = ({ feedbackRequest }: { feedbackRequest: FeedbackRequest }) => {
  return (
    <li className='relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6'>
      <div className='flex items-center justify-between space-x-4'>
        {/* <!-- Repo name and link --> */}
        <div className='min-w-0'>
          <div className='flex items-center space-x-3'>
            <span className='block'>
              <h2 className='text-sm font-medium'>
                <span className='absolute inset-0' aria-hidden='true'></span>
                {feedbackRequest.customerName}{' '}
                {feedbackRequest.source && (
                  <span className='text-gray-500'>via {feedbackRequest?.source}</span>
                )}
              </h2>
            </span>
          </div>
          <div className='relative group flex items-center space-x-2.5'>
            <span className='text-sm text-gray-500 font-medium truncate'>
              {feedbackRequest.customerPhone}
            </span>
          </div>
        </div>
        <div className='sm:hidden'>
          {/* <!-- Heroicon name: chevron-right --> */}
          {feedbackRequest.resultNumber > 0 ? (
            <span
              className={`px-2 rounded-md ${
                feedbackRequest.resultNumber === 5 ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {'⭐⭐⭐⭐⭐'.slice(0, feedbackRequest.resultNumber) +
                '⚫⚫⚫⚫⚫'.slice(feedbackRequest.resultNumber, 5)}
            </span>
          ) : (
            'No Review Yet'
          )}
        </div>
        {/* <!-- Repo meta info --> */}
        <div className='hidden sm:flex flex-col flex-shrink-0 items-end space-y-3'>
          <p className='flex text-gray-500 text-sm space-x-2'>
            {feedbackRequest.resultNumber === 5 && (
              <>
                <span aria-hidden='true'>&middot;</span>
                <span className='font-bold'>
                  {feedbackRequest.reviewLinkClicked ? 'Review Link Clicked!' : ''}
                </span>
              </>
            )}
            {/* <!-- Heroicon name: chevron-right --> */}
            {feedbackRequest.resultNumber > 0 ? (
              <span
                className={`px-2 rounded-md ${
                  feedbackRequest.resultNumber === 5 ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {'⭐⭐⭐⭐⭐'.slice(0, feedbackRequest.resultNumber) +
                  '⚫⚫⚫⚫⚫'.slice(feedbackRequest.resultNumber, 5)}
              </span>
            ) : (
              <span className='px-2 font-bold'>No Review Yet</span>
            )}
            <span aria-hidden='true'>&middot;</span>
            <span>{feedbackRequest.createdDate?.toDate().toLocaleDateString()}</span>
          </p>
        </div>
      </div>
    </li>
  );
};
