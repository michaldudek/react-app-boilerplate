import { combineReducers } from 'redux'
import { promiseAwaitReducer } from 'redux-promise-await-middleware'

import demo from './demo'

const reducers = combineReducers({
  demo,
  _promises: promiseAwaitReducer()
})

export default reducers
