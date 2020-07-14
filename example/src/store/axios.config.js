import axios from 'axios'

import Actions from './components/Actions'
import { axiosRInit, dispatcher } from 'axios-r'
import { store } from './index'

// Set Axios Defaults
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

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
