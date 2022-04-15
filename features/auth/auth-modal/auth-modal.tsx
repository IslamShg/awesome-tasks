import React, { useState } from 'react'

import classes from './auth-modal.module.scss'
import { Button, Link, TextField } from '@mui/material'
import { FormikProvider, useFormik } from 'formik'
import { authValidation } from '../common'

const authTypes = {
  signIn: 'signIn',
  signUp: 'signUp'
}

export const AuthModal = () => {
  const [authType, setAuthType] = useState(authTypes.signIn)

  const formik = useFormik({
    onSubmit: () => {},
    validationSchema: authValidation,
    initialValues: {
      email: '',
      password: ''
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
          onChange={formik.handleChange}
          helperText={formik.errors.password}
          error={!!formik.errors.password}
          fullWidth
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
