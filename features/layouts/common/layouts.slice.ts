import { bindActionCreators, createSlice } from '@reduxjs/toolkit'
import { useAppDispatch } from '../../../store/store'

type stateType = {
  mainSidebarOpened: boolean
}

const SLICE_NAME = 'layouts-slice'

const initialState: stateType = {
  mainSidebarOpened: true
}

export const layoutsSlice = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {
    toggleSidebar: (state: stateType) => {
      state.mainSidebarOpened = !state.mainSidebarOpened
    }
  }
})

export const useLayoutsActions = () => {
  const dispatch = useAppDispatch()
  return bindActionCreators({ ...layoutsSlice.actions }, dispatch)
}
