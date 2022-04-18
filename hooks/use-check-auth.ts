import { useState } from 'react'
import { getAuth, onAuthStateChanged, User } from '@firebase/auth'

export const useCheckAuth = () => {
  const [user, setUser] = useState<User | undefined>()
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // TODO: взять пользователя из firestore по uid
      console.log('зареган')
      setUser(user)
      setIsAuth(true)
    } else {
      console.log('не зареган')
      setIsAuth(false)
    }
    setIsLoading(false)
  })

  return {
    isLoading,
    isAuth,
    user,
  }
}
