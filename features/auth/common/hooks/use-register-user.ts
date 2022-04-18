import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential
} from 'firebase/auth'
import { useState } from 'react'

import { AUTH_ERRORS_CODES } from '../auth.constants'

type argsType = {
  email: string
  password: string
}

type status = 'loading' | 'success' | 'error' | 'idle'

export const useRegisterUser = () => {
  const [user, setUser] = useState<UserCredential | undefined>()
  const [status, setStatus] = useState<status>('idle')
  const [errorText, setErrorText] = useState('')
  const auth = getAuth()

  const handleRegister = async ({ email, password }: argsType) => {
    // TODO: положить пользователя в firestore по uid
    try {
      const userCreds: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      setUser(userCreds)
      setStatus('success')
    } catch (e: any) {
      console.log(e?.message, e?.code)
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
    handleRegister
  }
}
