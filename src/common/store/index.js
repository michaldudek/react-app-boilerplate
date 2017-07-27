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

  // enable webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(require('reducers').default))
  }

  return store
}
