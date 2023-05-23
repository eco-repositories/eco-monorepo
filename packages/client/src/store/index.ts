import * as appActions from './app/actions'
import { store } from './store'

// public API
export { store, useDispatch, useSelector } from './store'

setTimeout(() => {
  store.dispatch(appActions.initialize())
}, 0)
