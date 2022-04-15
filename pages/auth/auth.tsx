import React from 'react'

import classes from './auth.module.scss'
import { AuthModal } from '../../features/auth'

const AuthPage = () => {
  return (
    <div className={classes.root}>
      <AuthModal />
    </div>
  )
}

export default AuthPage
