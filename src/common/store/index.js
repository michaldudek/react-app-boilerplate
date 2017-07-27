import {
  createStore,
  compose,
  applyMiddleware
} from 'redux'
import {
  promiseAwaitMiddleware,
  promiseMiddleware
} from 'redux-promise-await-middleware'

import reducers from 'reducers'

export default (initialState = {}) => {
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(
        promiseAwaitMiddleware(),
        promiseMiddleware()
      )
    )
  )

  return store
}
