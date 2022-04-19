import {
  bindActionCreators,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { useAppDispatch } from '../../../store/store'
import { Collection } from './tasks.types'

type State = {
  collections?: Collection[]
}

const SLICE_NAME = 'tasksSlice'
const initialState: State = {}

export const tasksSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setCollections: (state: State, action: PayloadAction<Collection[]>) => {
      state.collections = action.payload
    }
  }
})

export const useTasksActions = () => {
  const dispatch = useAppDispatch()
  return bindActionCreators(tasksSlice.actions, dispatch)
}
