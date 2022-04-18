import React, { useState } from 'react'
import { FormikProvider, useFormik } from 'formik'
import {
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import { authValidation, useLoginUser, useRegisterUser } from '../common'
import classes from './auth-modal.module.scss'

const authTypes = {
  signIn: 'signIn',
  signUp: 'signUp'
}

export const AuthModal = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [authError, setAuthError] = useState('')
  const [authType, setAuthType] = useState(authTypes.signIn)

  const { handleRegister } = useRegisterUser()
  const { handleLogin } = useLoginUser()

  const formik = useFormik({
    validationSchema: authValidation,
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async ({ email, password }) => {
      const handleAuth =
        authType === authTypes.signIn ? handleLogin : handleRegister
      const { errorText } = await handleAuth({ email, password })

      if (errorText) {
        setAuthError(errorText)
        formik.setFieldError('password', errorText)
        console.log('error')
      }
    }
  })

  return (
    <div className={classes.root}>
      <FormikProvider value={formik}>
        <TextField
          placeholder="E-mail"
          name="email"
          type="email"
          error={!!formik.errors.email}
          helperText={formik.errors.email}
          onChange={formik.handleChange}
          fullWidth
        />
        <TextField
          placeholder="Password"
          name="password"
          type={isPasswordShown ? 'text' : 'password'}
          onChange={formik.handleChange}
          helperText={formik.errors.password || authError}
          error={!!formik.errors.password}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setIsPasswordShown((prev) => !prev)}
                >
                  {isPasswordShown ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{
            margin: '10px 0'
          }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={formik.submitForm}
          sx={{
            marginBottom: 1
          }}
        >
          Submit
        </Button>
        {authType === authTypes.signIn ? (
          <Link
            component="button"
            onClick={() => setAuthType(authTypes.signUp)}
          >
            Нет аккаунта?
          </Link>
        ) : (
          <Link
            component="button"
            onClick={() => setAuthType(authTypes.signIn)}
          >
            Уже есть аккаунт?
          </Link>
        )}
      </FormikProvider>
    </div>
  )
}
