import { axiosR, generateId } from 'axios-r'

let requestId = 1

const getProject = (id) =>
  axiosR(
    'project',
    generateId(requestId++),
    'get',
    `https://jsonplaceholder.typicode.com/posts/${id}`
  )

export { getProject }
