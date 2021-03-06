import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { layoutsSlice } from '../features/layouts'
import { tasksSlice } from '../features/tasks'

export const store = configureStore({
  reducer: {
    layout: layoutsSlice.reducer,
    tasks: tasksSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
