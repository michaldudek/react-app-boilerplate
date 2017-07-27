import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

import App from 'components/App'
import createStore from 'store'

const store = createStore(window.__INITIAL_STATE__)

const render = (Component) => {
  ReactDOM.render((
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>
  ), document.getElementById('root'))
}

render(App)

if (module.hot) {
  module.hot.accept('../common/components/App', () => {
    render(require('components/App').default)
  })
}
