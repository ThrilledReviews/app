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
        'pk_test_51HzhyWLjqDOPvfebz29iqaayX2FNciCcCTtH2DhWqhldkw5ZSrrbr3OumyzxaFSuxkByLzI8WXktwIPAqfP4XupF00zubmy9Yz'
      )}
    >
      <App />
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);
