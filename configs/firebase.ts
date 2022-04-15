import { initializeApp } from 'firebase/app'
import { getAuth } from '@firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAMdWtA0XYpwr2C4cuP_CQuUQNLtF85b5Y',
  authDomain: 'awesome-tas.firebaseapp.com',
  projectId: 'awesome-tas',
  storageBucket: 'awesome-tas.appspot.com',
  messagingSenderId: '162919280659',
  appId: '1:162919280659:web:de983a11b584a2aeb70fe6',
}

export const firebaseApp = initializeApp(firebaseConfig)
