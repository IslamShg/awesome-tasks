import {
  bindActionCreators,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { User } from './user.types'
import { useAppDispatch } from '../../../store/store'

type State = {
  user?: {
    email?: string
  }
}

const SLICE_NAME = 'userSlice'
const initialState: State = {}

export const userSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setUser(state: State, action: PayloadAction<User>) {
      state.user = action.payload
    }
  }
})

export const useUserActions = () => {
  const dispatch = useAppDispatch()
  return bindActionCreators(userSlice.actions, dispatch)
}
