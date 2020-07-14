import { axiosR, generateId } from 'axios-r'
let requestId = 1

const getNote = (id) =>
  axiosR('note', generateId(requestId++), 'get', `/notes/${id}`)

export { getNote }
