import { useEffect } from 'react'
import { onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { collection } from '@firebase/firestore'

import { Collection } from '../tasks.types'
import { firebaseDb } from '../../../../configs/firebase'
import { useTasksActions } from '../tasks.slice'
import { getUserUid } from '../../../../utils/getUserUid'

export const useSetCollections = () => {
  const userUid = getUserUid()
  const { setCollections } = useTasksActions()

  useEffect(() => {
    const collectionsQuery = query(
      collection(firebaseDb, 'collections'),
      where('authorUid', '==', userUid),
      orderBy('timestamp', 'desc')
    )

    const unsubscribe = onSnapshot(collectionsQuery, (snapshot) => {
      const collectionsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        timestamp: undefined,
        uid: doc.id
      }))
      setCollections(collectionsData as Collection[])
    })
    return unsubscribe
  }, [userUid])
}
