import * as appActions from './app/actions.js'
import { store } from './store.js'

// public API
export { store, useDispatch, useSelector } from './store.js'

setTimeout(() => {
  store.dispatch(appActions.initialize())
}, 0)
