/*
 * Redux store middleware that transforms actions that contain 'promise' key (function)
 * into async actions split into 3 different actions fired at appropriate times:
 *
 *  - action.type + '__ASYNC' - when the action is dispatched
 *  - action.type - when the promise is successfuly resolved
 *  - action.type + '__ERROR' - when the promise is rejected
 */
export default () => (next) => (action) => {
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

  return promise()
    .then((result) => {
      next({ ...rest, result, type: RESOLVED })
      return result
    })
    .catch((error) => {
      next({ ...rest, error, type: ERROR })
    })
}
