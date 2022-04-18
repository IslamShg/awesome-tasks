import type { AppProps } from 'next/app'
import { getAuth } from '@firebase/auth'
import { useEffect } from 'react'
import { Provider } from 'react-redux'

import { useCheckAuth } from '../hooks/use-check-auth'
import { firebaseApp } from '../configs/firebase'
import { store } from '../store/store'
import AuthPage from './auth/auth'
import '../styles/globals.css'

const initFirebase = () => {
  getAuth(firebaseApp)
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(initFirebase, [])

  const { isLoading, isAuth } = useCheckAuth()

  if (isLoading) {
    return <div>Загрузка</div>
  }

  return isAuth ? (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  ) : (
    <AuthPage {...pageProps} />
  )
}

export default MyApp
