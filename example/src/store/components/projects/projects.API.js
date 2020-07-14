import _keys from 'lodash/keys'
import _pick from 'lodash/pick'

import { axiosR, generateId } from 'axios-r'
import { requestModel } from './projects.model'

let requestId = 1
const modelFn = (item) => _pick(item, _keys(requestModel))

// Reducer & requestId
const requestData = () => ['projects', generateId(requestId++)]

// Save Data in Redux
const getProjects = (params = null, update) =>
  axiosR(
    ...requestData(),
    'get',
    'https://jsonplaceholder.typicode.com/posts',
    null,
    params,
    null,
    update
  )
const postProject = (data) =>
  axiosR(...requestData(), 'post', '/projects', modelFn(data))
const putProject = (data) =>
  axiosR(...requestData(), 'put', `/projects/${data.id}`, modelFn(data))
const deleteProject = (data) =>
  axiosR(...requestData(), 'delete', `/projects/${data.id}`)

// Only API Call
const searchProjects = (params = null) =>
  axiosR('', '', 'get', '/projects', null, params)

export { getProjects, postProject, putProject, deleteProject, searchProjects }
