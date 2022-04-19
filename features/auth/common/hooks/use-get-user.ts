import { useEffect, useMemo, useState } from 'react'
import { getAuth } from '@firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'

import { firebaseDb } from '../../../../configs/firebase'
import { User } from '../../../user/common'

export const useGetUser = () => {
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(true)

  const auth = getAuth()
  const userUid = auth?.currentUser?.uid
  const userDocRef = useMemo(() => doc(firebaseDb, 'users', userUid || ''), [])

  useEffect(() => {
    const unsub = onSnapshot(userDocRef, (userDoc) => {
      console.log('get user snapshot called')
      setUser(userDoc?.data() as User)
      setIsLoading(false)
    })

    return () => unsub()
  }, [userDocRef])

  return {
    isLoading,
    user
  }
}
