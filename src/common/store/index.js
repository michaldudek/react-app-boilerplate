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

// support redux devtools browser extension
const composeWithDevTools = (
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
)
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose

/**
 * Creates a configured Redux store.
 *
 * @param  {Object} initialState Initial state.
 * @return {Redux}
 */
export default (initialState = {}) => {
  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        promiseAwaitMiddleware(),
        promiseMiddleware()
      )
    )
  )

  // enable webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(require('reducers').default))
  }

  return store
}
