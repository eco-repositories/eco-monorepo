import { createAction } from '@reduxjs/toolkit'
import { app } from './slice.ts'

export const {
  startLoading,
  stopLoading,
} = app.actions

export const initialize = createAction(`${app.name}/initialize`)
