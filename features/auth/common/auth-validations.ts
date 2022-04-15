import * as yup from 'yup'

export const authValidation = yup.object().shape({
  email: yup
    .string()
    .required('This field is required')
    .min(3, 'Min length is 3 symbols')
    .email('Email is not valid'),
  password: yup
    .string()
    .required('This field is required')
    .min(3, 'Min length is 3 symbols')
})
