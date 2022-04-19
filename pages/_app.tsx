import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import { useCheckAuth } from '../hooks/use-check-auth'
import { store } from '../store/store'
import AuthPage from './auth/auth'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
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
