import {
  createStore,
  compose,
  applyMiddleware
} from 'redux'

import reducers from 'reducers'
import promiseMiddleware from 'lib/promiseMiddleware'

export default (initialState = {}) => {
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(
        promiseMiddleware
      )
    )
  )

  return store
}
