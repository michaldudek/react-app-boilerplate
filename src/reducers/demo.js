import { DEMO_ACTION } from 'actions/demo'

const initialState = {
  number: 0,
  result: 0,
  processing: false,
  changed: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DEMO_ACTION:
      return {
        ...state,
        number: action.data.number,
        result: action.result,
        changed: true,
        processing: false
      }

    case DEMO_ACTION + '__ASYNC':
      return {
        ...state,
        processing: true
      }
  }

  return state
}
