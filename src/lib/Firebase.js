/**
 * My Firebase Config
 */

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyD7sNY8Lo2GA6VMayxIbgTgx9zKdsSBu08',
  authDomain: 'samen-uit-samen-thuis-2cb52.firebaseapp.com',
  projectId: 'samen-uit-samen-thuis-2cb52',
  storageBucket: 'samen-uit-samen-thuis-2cb52.appspot.com',
  messagingSenderId: '139658962347',
  appId: '1:139658962347:web:188a7b90db6e80e0e15eee',
};

const initFirebase = () => {
  initializeApp(firebaseConfig);
};

export default initFirebase;
