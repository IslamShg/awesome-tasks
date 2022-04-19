import { useState } from 'react'
import { getAuth, onAuthStateChanged } from '@firebase/auth'

import { firebaseApp } from '../configs/firebase'

export const useCheckAuth = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const auth = getAuth(firebaseApp)
  onAuthStateChanged(auth, (user) => {
    setIsAuth(!!user)
    setIsLoading(false)
  })

  return {
    isLoading,
    isAuth
  }
}
