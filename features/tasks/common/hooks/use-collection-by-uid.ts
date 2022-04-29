import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'

import { firebaseDb } from '../../../../configs/firebase'
import { Collection } from '../tasks.types'

type HookArgs = {
  collectionUid: string
  prefetchedCollection?: Collection
}

export const useCollectionByUid = ({
  collectionUid,
  prefetchedCollection
}: HookArgs) => {
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(prefetchedCollection || null)

  useEffect(() => {
    const unsub = onSnapshot(
      doc(firebaseDb, 'collections', collectionUid),
      (docSnap) => {
        console.log('get collection hook called')
        const collectionData = {
          ...docSnap.data(),
          uid: docSnap.id
        }
        setSelectedCollection(collectionData as Collection)
      }
    )

    return () => unsub()
  }, [collectionUid])

  return {
    collection: selectedCollection
  }
}
