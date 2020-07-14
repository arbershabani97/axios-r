# axios-r

> Axios Redux Wrapper

[![NPM](https://img.shields.io/npm/v/axios-r.svg)](https://www.npmjs.com/package/axios-r) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save axios-r
```

## Usage

Axios Redux Wrapper handles redux actions (even if request fails and retries). This library solves the issue of updating token, and updating reducers after the queued request execution (after token expiration, - meaning if you save requests in queue till the token is updated).
Also this handles etag caching by simply adding true at the end of the request axiosReq(action, reducer).get(url, {}, true)
Warning -> Etag caching has not been tested yet thoroughly, so it may not work as expected (I'll test it out as soon as I can and fix it with the next release)

```
Ex. We're getting todos

Request -> 401 -> Error (getTodos) --- getTodos request gets saved in axios requests queue

Request -> 200 -> Success (token) --- then axios requests queue continues

Request -> 200 -> Success (getTodos) --> redux action is called and reducer is updated
```

To get started using Axios Redux Wrapper, all you gotta do is:

1. Install axios-r
2. Setup the axios.config.js file (src/store/axios.config.js)
3. Import axios.config.js in index (src/index.js)
4. Import axiosR in redux and start using it (src/store/components/todos/todo.API.js)

There is no need for this `connect(null, {getTodos})(App)`, you can just call it, let's say

```jsx
// Using React Hooks
const fetchTodos = async () => {
  try {
    getTodos()
  } catch (e) {
    console.error(e)
  }
}
useEffect(() => {
  fetchTodos()
})
```

#### index.js

```jsx
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './store/axios.config'
import { store } from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

#### axios.config.js

```jsx
import axios from 'axios'

import Actions from './components/Actions'
import { axiosRInit, dispatcher } from 'axios-r'
import { store } from './index'

// Set Axios Defaults
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com' // Random sample API url

axios.interceptors.request.use((config) => {
  dispatcher('request', { config })
  return config
})

axios.interceptors.response.use(
  (data) => {
    dispatcher('success', data)
    return data
  },
  (error) => {
    dispatcher('error', error)
    return Promise.reject(error)
  }
)
axiosRInit(axios, store, Actions)
```

#### projects.API.js

```jsx
import { axiosR } from 'axios-r'

// Reducer and Action Name
const reducer = 'projects'

const getProjects = (params = null, update) => {
  const action = update ? 'getUpdate' : 'get'
  return axiosR(reducer, action).get('/posts', { params }, true)
}
```

##### for a better understanding of how axiosR works

```jsx
axiosR(reducer, action).get(url, { params, headers }, ETag)

reducer -
  'The action & reducer name (action name in Actions.js, which is imported in axios.config.js)'
action -
  'The action call name - exported in src/store/components/projects/projects.actions.js'

    .get(url, { params: {}, headers }, ETag) // where if etag is true, it checks the reducer etag and updates it
    .post(url, data, headers)
    .put(url, data, headers)
    .delete(url)
```

## License

MIT © [arbershabani97](https://github.com/arbershabani97)
