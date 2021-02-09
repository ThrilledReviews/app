import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';
import 'firebase/analytics';

export const initializeFirebase = () => {
  const firebaseConfigProduction = {
    apiKey: 'AIzaSyA5f7AgQCHpYB874nJJnBkvj1XTkEefKn8',
    authDomain: 'thrilledreviews.firebaseapp.com',
    projectId: 'thrilledreviews',
    storageBucket: 'thrilledreviews.appspot.com',
    messagingSenderId: '905048640368',
    appId: '1:905048640368:web:f9beffbef59d90a1df5db5',
    measurementId: 'G-MD2D998WZ1',
  };

  const firebaseConfigStaging = {
    apiKey: 'AIzaSyByDxINzKVp8WfMjzDLf7qx7aFlSFPntmQ',
    authDomain: 'thrilledreviews-staging.firebaseapp.com',
    projectId: 'thrilledreviews-staging',
    storageBucket: 'thrilledreviews-staging.appspot.com',
    messagingSenderId: '1031512099170',
    appId: '1:1031512099170:web:0063ea32b8e89f399bc43b',
    measurementId: 'G-GD9W0BXQG8',
  };

  firebase.initializeApp(
    process.env.NODE_ENV === 'production' ? firebaseConfigProduction : firebaseConfigStaging
  );
  process.env.NODE_ENV === 'production' && firebase.analytics();
};
