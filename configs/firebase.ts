import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBXWIu1_xuoHDgBb1iCE3O9X3YZ4eLMv1E",
  authDomain: "awesome-tasks-2.firebaseapp.com",
  projectId: "awesome-tasks-2",
  storageBucket: "awesome-tasks-2.appspot.com",
  messagingSenderId: "279472947107",
  appId: "1:279472947107:web:40bcf0b027c0f994a4e416"
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseDb = getFirestore(firebaseApp)
