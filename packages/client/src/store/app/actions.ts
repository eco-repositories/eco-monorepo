import { forSlice } from '#@/store/for-slice.js'
import { app } from './slice.js'

export const {
  startLoading,
  stopLoading,
} = app.actions

export const initialize = forSlice(app).withName('initialize').createAction()
