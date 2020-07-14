import _keys from 'lodash/keys'
import _pick from 'lodash/pick'

import { axiosR } from 'axios-r'
import { requestModel } from './projects.model'

const modelFn = (item) => _pick(item, _keys(requestModel))

// Reducer and Action Name
const reducer = 'projects'

const getProjects = (params = null, update) => {
  const action = update ? 'getUpdate' : 'get'
  return axiosR(reducer, action).get('/posts', { params }, true)
}

const postProject = (data) => {
  return axiosR(reducer, 'post').post('/posts', modelFn(data))
}

const putProject = (data) => {
  return axiosR(reducer, 'put').put(`/posts/${data.id}`, modelFn(data))
}

const deleteProject = (data) => {
  return axiosR(reducer, 'delete').delete(`/posts/${data.id}`)
}

// Only API Call
const searchProjects = (params = null) => axiosR().get('/posts', { params })

export { getProjects, postProject, putProject, deleteProject, searchProjects }
