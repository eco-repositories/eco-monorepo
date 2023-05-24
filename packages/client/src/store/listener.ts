import { createListenerMiddleware } from '@reduxjs/toolkit'
import * as appActions from './app/actions.ts'

export const listener = createListenerMiddleware()

listener.startListening({
  actionCreator: appActions.initialize,
  async effect(action, rtk) {
    rtk.dispatch(appActions.startLoading())

    await rtk.delay(250) // for style

    rtk.dispatch(appActions.stopLoading())
  },
})
