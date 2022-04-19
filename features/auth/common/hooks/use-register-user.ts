import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential
} from 'firebase/auth'
import { useState } from 'react'
import { doc, setDoc } from '@firebase/firestore'

import { AUTH_ERRORS_CODES } from '../auth.constants'
import { firebaseDb } from '../../../../configs/firebase'

type argsType = {
  email: string
  password: string
}

export const AUTH_REQUEST_STATUSES = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading'
}

export const useRegisterUser = () => {
  const [status, setStatus] = useState('')
  const [errorText, setErrorText] = useState('')
  const auth = getAuth()

  const handleRegister = async ({ email, password }: argsType) => {
    setStatus(AUTH_REQUEST_STATUSES.LOADING)
    try {
      const userCreds: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      setStatus(AUTH_REQUEST_STATUSES.SUCCESS)

      await setDoc(doc(firebaseDb, 'users', userCreds.user.uid), {
        uid: userCreds.user.uid,
        email,
        createdTime: Date.now()
      })
    } catch (e: any) {
      const errorCode: keyof typeof AUTH_ERRORS_CODES = e?.code
      setStatus(AUTH_REQUEST_STATUSES.ERROR)
      setErrorText(AUTH_ERRORS_CODES[errorCode] || 'Произошла ошибка')
    }

    return {
      status,
      errorText
    }
  }

  return {
    handleRegister
  }
}
