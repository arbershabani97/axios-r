import _keys from 'lodash/keys'
import _pick from 'lodash/pick'

import { axiosR, generateId } from 'axios-r'
import { requestModel } from './notes.model'

let requestId = 1
const modelFn = (item) => _pick(item, _keys(requestModel))

// Reducer & requestId
const requestData = () => ['notes', generateId(requestId++)]

// Save Data in Redux
const getNotes = (params = null, update) =>
  axiosR(...requestData(), 'get', '/notes', null, params, null, update)
const postNote = (data) =>
  axiosR(...requestData(), 'post', '/notes', modelFn(data))
const putNote = (data) =>
  axiosR(...requestData(), 'put', `/notes/${data.id}`, modelFn(data))
const deleteNote = (data) =>
  axiosR(...requestData(), 'delete', `/notes/${data.id}`)

// Only API Call
const searchNotes = (params = null) =>
  axiosR('', '', 'get', '/notes', null, params)

export { getNotes, postNote, putNote, deleteNote, searchNotes }
