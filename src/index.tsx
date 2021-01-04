import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { initializeFirebase } from './utils/initializeFirebase';

import './index.css';

initializeFirebase();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
