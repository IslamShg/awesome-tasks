import {
  getAuth,
  UserCredential,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { useState } from 'react'

import { AUTH_ERRORS_CODES } from '../auth.constants'

type argsType = {
  email: string
  password: string
}

type status = 'loading' | 'success' | 'error' | 'idle'

export const useLoginUser = () => {
  const [user, setUser] = useState<UserCredential | undefined>()
  const [status, setStatus] = useState<status>('idle')
  const [errorText, setErrorText] = useState('')
  const auth = getAuth()

  const handleLogin = async ({ email, password }: argsType) => {
    try {
      const userCreds: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      setUser(userCreds)
      setStatus('success')
    } catch (e: any) {
      const errorCode: keyof typeof AUTH_ERRORS_CODES = e?.code
      setStatus('error')
      setErrorText(AUTH_ERRORS_CODES[errorCode] || 'Произошла ошибка')
    }

    return {
      user,
      status,
      errorText
    }
  }

  return {
    handleLogin
  }
}
