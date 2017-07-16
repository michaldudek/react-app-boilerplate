import { combineReducers } from 'redux'

import { promiseReducer } from 'lib/promiseMiddleware'
import demo from './demo'

const reducers = combineReducers({
  demo,
  _promises: promiseReducer
})

export default reducers
