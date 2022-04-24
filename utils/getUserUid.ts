import { getAuth } from 'firebase/auth'

export const getUserUid = () => {
  const auth = getAuth()

  return auth.currentUser?.uid
}
