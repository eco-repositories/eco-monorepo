import { createAction } from '@reduxjs/toolkit'
import { app } from './slice.js'

export const {
  startLoading,
  stopLoading,
} = app.actions

export const initialize = createAction(`${app.name}/initialize`)
