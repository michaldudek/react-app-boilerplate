/*
 * Redux store middleware that transforms actions that contain 'promise' key (function)
 * into async actions split into 3 different actions fired at appropriate times:
 *
 *  - action.type + '__ASYNC' - when the action is dispatched
 *  - action.type - when the promise is successfuly resolved
 *  - action.type + '__ERROR' - when the promise is rejected
 *
 * Also collects all promises into a reducer so that SSR can wait for them to be resolved
 * before rendering a response.
 */

export const AWAIT_PROMISE = '__AWAIT_PROMISE'

/**
 * Redux Store middleware.
 *
 * @return {Function}
 */
export default function promiseMiddleware () {
  return (next) => (action) => {
    const {
      promise,
      type,
      ...rest
    } = action

    // ignore if no promise
    if (!promise || typeof promise !== 'function') {
      return next(action)
    }

    const RESOLVED = type
    const START = `${type}__ASYNC`
    const ERROR = `${type}__ERROR`

    next({ ...rest, type: START })

    const actionPromise = promise()

    next({ type: AWAIT_PROMISE, promise: actionPromise })

    return actionPromise
      .then((result) => {
        next({ ...rest, result, type: RESOLVED })
        return result
      })
      .catch((error) => {
        next({ ...rest, error, type: ERROR })
      })
  }
}

/**
 * Redux Store reducer.
 *
 * @param  {Array}  state  Current state.
 * @param  {Object} action Dispatched action.
 *
 * @return {Array}
 */
export function promiseReducer (state = [], action) {
  if (
    // don't do this in the browser
    typeof window === 'object' ||
    action.type !== AWAIT_PROMISE
  ) {
    return state
  }

  return [...state, action.promise]
}
