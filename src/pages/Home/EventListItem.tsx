import firebase from 'firebase/app';

export interface AppEvent {
  createdDate: firebase.firestore.Timestamp;
  event: string;
  eventName: string;
  message: string;
  customerPhone?: string;
}

export const EventListItem = ({ event }: { event: AppEvent }) => (
  <li className='py-4'>
    <div className='flex space-x-3'>
      <div className='flex-1 flex flex-col space-y-1 justify-between'>
        <div className='flex items-center justify-between'>
          <h3
            className={`text-sm font-medium ${
              (event.event === 'one_star_review' ||
                event.event === 'two_star_review' ||
                event.event === 'three_star_review' ||
                event.event === 'four_star_review') &&
              'text-red-500'
            } ${event.event === 'five_star_review' && 'text-blue-500'} ${
              event.event === 'review_link_clicked' && 'text-green-500'
            }`}
          >
            {event.eventName}
          </h3>
          <p className='text-sm text-gray-500'>{event.createdDate.toDate().toLocaleDateString()}</p>
        </div>
        <p className='text-sm text-gray-500'>{event.message}</p>
        {(event.event === 'one_star_review' ||
          event.event === 'two_star_review' ||
          event.event === 'three_star_review' ||
          event.event === 'four_star_review') && (
          <a
            href={`tel:${event.customerPhone}`}
            style={{ marginTop: '1rem' }}
            className='block text-center sm:hidden p-2 rounded bg-blue-500 text-white'
          >
            Click to Call {event.customerPhone}
          </a>
        )}
      </div>
    </div>
  </li>
);
