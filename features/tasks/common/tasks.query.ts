import { getAuth } from 'firebase/auth'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { useMemo } from 'react'
import { firebaseDb } from '../../../configs/firebase'

export const getInboxTasksQuery = () => {
  const auth = getAuth()
  const userUid = auth.currentUser?.uid

  return query(
    collection(firebaseDb, 'tasks'),
    where('authorUid', '==', userUid || ''),
    orderBy('timestamp', 'desc')
  )
}
