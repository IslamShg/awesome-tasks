import { RootState } from '../../../store/store'

export const mainSidebarStateSelector = (state: RootState) =>
  state.layout.mainSidebarOpened
