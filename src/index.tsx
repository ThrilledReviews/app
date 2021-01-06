import React from 'react';
import ReactDOM from 'react-dom';
import { Elements } from '@stripe/react-stripe-js';

import { App } from './App';
import { initializeFirebase } from './utils/initializeFirebase';

import './index.css';
import { loadStripe } from '@stripe/stripe-js';

initializeFirebase();

ReactDOM.render(
  <React.StrictMode>
    <Elements
      stripe={loadStripe(
        'pk_live_51HzhyWLjqDOPvfebFx6IB2VX0ABcpz8mt8MRQ2SXVWjbz5zo2uWJergpucp5fsWF13rpoEsySpWr2WjKjXLmVU5W00vhX2yK7Y'
      )}
    >
      <App />
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);
