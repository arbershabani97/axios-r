import { axiosR } from 'axios-r'

const getProject = (id) => {
  return axiosR('project', 'get').get('/posts/' + id, null, true)
}

export { getProject }
