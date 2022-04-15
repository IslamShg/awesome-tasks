import type { AppProps } from 'next/app'
import { getAuth } from '@firebase/auth'

import AuthPage from './auth/auth'
import { firebaseApp } from '../configs/firebase'
import { useCheckAuth } from '../hooks/use-check-auth'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  getAuth(firebaseApp)

  const { isLoading, isAuth } = useCheckAuth()

  if (isLoading) {
    return <div>Загрузка</div>
  }

  return isAuth ? <Component {...pageProps} /> : <AuthPage {...pageProps} />
}

export default MyApp
