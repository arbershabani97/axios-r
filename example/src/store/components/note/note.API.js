import { axiosR } from 'axios-r'

const getNote = (id) => {
  return axiosR('note', 'get').get('/posts/' + id, null, true)
}

export { getNote }
