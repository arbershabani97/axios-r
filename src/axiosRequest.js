import generateId from './generateId'
export default (axios, store) => {
  // eslint-disable-next-line max-statements, max-params
  const axiosWrapper = (reducer, action, extras, requestId, ETag) => {
    const instance = axios.create()
    if (requestId) instance.defaults.headers.requestId = requestId
    if (reducer)
      instance.defaults.headers.reducer = reducer.includes('.')
        ? reducer.split('.')[0]
        : reducer
    if (action) instance.defaults.headers.action = action
    if (extras) instance.defaults.headers.extras = extras
    if (reducer && action) {
      if (ETag) {
        if (reducer.includes('.')) {
          const [stateReducer, child] = reducer.split('.')
          const { etag = null } = store.getState()[stateReducer]?.[child] || {}
          if (etag) instance.defaults.headers['If-None-Match'] = etag
        } else {
          const { etag = null } = store.getState()[reducer] || {}
          if (etag) instance.defaults.headers['If-None-Match'] = etag
        }
      }
    }
    instance.interceptors.request = axios.interceptors.request
    instance.interceptors.response = axios.interceptors.response
    // eslint-disable-next-line consistent-return
    return instance
  }
  let request = 0
  // eslint-disable-next-line max-params, consistent-return
  const axiosReq = (reducer, action, extras = null) => {
    return {
      ...axios,
      // data -> {params: {text:"hello"}, headers:{}}
      get: async (url, data = {}, ETag) => {
        const requestId = generateId(request++)
        try {
          return await axiosWrapper(
            reducer,
            action,
            extras,
            requestId,
            ETag
          ).get(url, data)
        } catch (error) {
          return Promise.reject(error)
        }
      },

      post: async (url, data, headers) => {
        const requestId = generateId(request++)
        try {
          return await axiosWrapper(reducer, action, extras, requestId).post(
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
          return await axiosWrapper(reducer, action, extras, requestId).put(
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
          return await axiosWrapper(reducer, action, extras, requestId).delete(
            url
          )
        } catch (error) {
          return Promise.reject(error)
        }
      }
    }
  }
  return axiosReq
}
