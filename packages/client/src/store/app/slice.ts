import { createSlice } from '@reduxjs/toolkit'

export interface State {
  loading: boolean
}

/** @private */
const initialState: State = {
  loading: true,
}

export const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true
    },

    stopLoading(state) {
      state.loading = false
    },
  },
})
