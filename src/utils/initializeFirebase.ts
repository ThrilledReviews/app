import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';
import 'firebase/analytics';

export const initializeFirebase = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDwrA1qDOeoHoYJPjloJP73yHD6ZO16KEQ',
    authDomain: 'thrill-check.firebaseapp.com',
    projectId: 'thrill-check',
    storageBucket: 'thrill-check.appspot.com',
    messagingSenderId: '194176666946',
    appId: '1:194176666946:web:95ff5ff841fcd4dd330cdb',
    measurementId: 'G-H5CKMQS03X',
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
};
