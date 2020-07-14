import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import './store/axios.config'
import * as serviceWorker from './serviceWorker'
import { store } from './store'

serviceWorker.register()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
)
