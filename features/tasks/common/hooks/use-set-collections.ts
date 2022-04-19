import { useEffect, useMemo } from 'react'
import { onSnapshot, query, where } from 'firebase/firestore'
import { collection } from '@firebase/firestore'

import { Collection } from '../tasks.types'
import { firebaseDb } from '../../../../configs/firebase'
import { getAuth } from 'firebase/auth'
import { useTasksActions } from '../tasks.slice'

export const useSetCollections = () => {
  const auth = getAuth()
  const userUid = useMemo(() => auth.currentUser?.uid, [])
  const { setCollections } = useTasksActions()

  useEffect(() => {
    const collectionsQuery = query(
      collection(firebaseDb, 'collections'),
      where('authorUid', '==', userUid)
    )

    const unsub = onSnapshot(collectionsQuery, (snapshot) => {
      const collectionsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        timestamp: undefined,
        uid: doc.id
      }))
      setCollections(collectionsData as Collection[])
    })
    return () => unsub()
  }, [userUid])
}
