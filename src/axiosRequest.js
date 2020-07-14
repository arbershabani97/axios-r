import generateId from './generateId'
export default (axios, store) => {
  // eslint-disable-next-line max-statements, max-params
  const axiosWrapper = (reducer, action, requestId, ETag) => {
    const instance = axios.create()
    if (requestId) instance.defaults.headers.requestId = requestId
    if (reducer && action) {
      instance.defaults.headers.reducer = reducer
      instance.defaults.headers.action = action
      if (ETag) {
        const { etag } = store.getState()[reducer]
        if (etag) instance.defaults.headers.ETag = etag
      }
    }
    instance.interceptors.request = axios.interceptors.request
    instance.interceptors.response = axios.interceptors.response
    // eslint-disable-next-line consistent-return
    return instance
  }
  let request = 0
  // eslint-disable-next-line max-params, consistent-return
  const axiosReq = (reducer, action) => {
    return {
      // data -> {params: {text:"hello"}, headers:{}}
      get: async (url, data = {}, ETag) => {
        const requestId = generateId(request++)
        try {
          return await axiosWrapper(reducer, action, requestId, ETag).get(
            url,
            data
          )
        } catch (error) {
          return Promise.reject(error)
        }
      },

      post: async (url, data, headers) => {
        const requestId = generateId(request++)
        try {
          return await axiosWrapper(reducer, action, requestId).post(
            url,
            data,
            headers
          )
        } catch (error) {
          return Promise.reject(error)
        }
      },

      put: async (url, data, headers) => {
        const requestId = generateId(request++)
        try {
          return await axiosWrapper(reducer, action, requestId).put(
            url,
            data,
            headers
          )
        } catch (error) {
          return Promise.reject(error)
        }
      },

      delete: async (url) => {
        const requestId = generateId(request++)
        try {
          return await axiosWrapper(reducer, action, requestId).delete(url)
        } catch (error) {
          return Promise.reject(error)
        }
      }
    }
  }
  return axiosReq
}
