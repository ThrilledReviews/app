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
        'pk_test_51I7SjHLK5eTx3dXTPGXUIbpTrN1KjBYa8HtfndTSoyNGcyYKOA6BkALk9g9DVerHpAXi9x5uGDMXOWKcM9QEYhwE00xVVxMkxn'
      )}
    >
      <App />
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);
