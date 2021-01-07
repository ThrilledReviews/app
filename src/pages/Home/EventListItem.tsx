import firebase from 'firebase/app';

export interface AppEvent {
  createdDate: firebase.firestore.Timestamp;
  event: string;
  eventName: string;
  message: string;
  customerName?: string;
  customerPhone?: string;
}

export const EventListItem = ({ event }: { event: AppEvent }) => (
  <li className='py-4'>
    <div className='flex space-x-3'>
      <div className='flex-1 space-y-1'>
        <div className='flex items-center justify-between'>
          <h3
            className={`text-sm font-medium ${
              (event.event === 'five_star_review' || event.event === 'review_link_clicked') &&
              'text-blue-400'
            }`}
          >
            {event.eventName}
          </h3>
          <p className='text-sm text-gray-500'>{event.createdDate.toDate().toLocaleString()}</p>
        </div>
        <p className='text-sm text-gray-500'>{event.message}</p>
        <p className='text-sm text-blue-500'>{event.customerPhone && event.customerPhone}</p>
      </div>
    </div>
  </li>
);
