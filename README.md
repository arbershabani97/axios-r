# axios-r

> Axios Redux Wrapper

[![NPM](https://img.shields.io/npm/v/axios-r.svg)](https://www.npmjs.com/package/axios-r) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save axios-r
```

## Usage

Axios Redux Wrapper handles the redux action call (even if request fails and retries). This library solves the problem of updating the token, and still updating the redux state (after token expiration, - meaning if you save requests in queue till the token is updated).

```
Ex. We're getting todos

Request -> 401 -> Error (getTodos)
--- getTodos request gets saved in axios requests queue

Request -> 200 -> Success (token)

--- axios requests queue continues
Request -> 200 -> Success (getTodos) -> redux action is called


```

To get started using Axios Redux Wrapper, all you gotta do is:

1. Install axios-r
2. Setup the axios.config.js file (src/store/axios.config.js)
3. Import axios.config.js in index (src/index.js)
4. Import axiosR in redux and start using it (src/store/components/todos/todo.API.js)

There is no need for this `connect(null, {getTodos})(App)`, you can just call it, let's say

```jsx
const fetchTodos = async () => {
  try {
    getTodos();
  } catch (e) {
    console.error(e);
  }
}
useEffect(() => {
  fetchTodos()
})
//or
componentDidMount(){
  this.fetchTodos();
}
fetchTodos = async () => {
  try {
    getTodos();
  } catch (e) {
    console.error(e);
  }
}
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

axios.interceptors.request.use((config) => {
  dispatcher('request', { config }, Actions)
  return config
})

axios.interceptors.response.use(
  (data) => {
    dispatcher('success', data, Actions)
    return data
  },
  (error) => {
    dispatcher('error', error, Actions)
    return Promise.reject(error)
  }
)
axiosRInit(axios, store, Actions)
```

#### projects.API.js

```jsx
import { axiosR, generateId } from 'axios-r'

let requestId = 1
const requestData = () => ['projects', generateId(requestId++)] // Reducer and Generated Id

const url = 'https://jsonplaceholder.typicode.com/posts'

const getProjects = (params = null, update) =>
  axiosR(...requestData(), 'get', url, null, params, null, update)
```

##### for a better understanding of how projects.API.js works

```jsx

import {axiosR, generateId} from 'axios-r'

let requestId = 1

const reducer = "todos"; // Reducer Name
const todoReqId = generateId(requestId++): // Request Id (help identify things)
const type = "get"; // Request Type
const url = 'https://jsonplaceholder.typicode.com/posts'; // Request Url
const data = null; // Request Data
const params = {params:{page:1}}; // Request Params
const headers = null; // Request Headers
const update = false // (false - infinite scroll, true - finite pagination)

const getTodos = () => axiosR(reducer, todoReqId, type, url, data, params, headers, update);

export {getTodos}
```

## License

MIT © [arbershabani97](https://github.com/arbershabani97)
