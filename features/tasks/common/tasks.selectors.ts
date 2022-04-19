import { RootState } from '../../../store/store'

export const selectCollections = (state: RootState) => state.tasks.collections
