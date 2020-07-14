export default (axios, store) => {
  // eslint-disable-next-line max-statements, max-params
  const axiosWrapper = (reducer, requestId, update, ETag) => {
    const instance = axios.create()
    if (requestId) instance.defaults.headers.requestId = requestId
    if (reducer) {
      instance.defaults.headers.reducer = reducer
      if (ETag) {
        const { etag } = store.getState()[reducer]
        if (etag) instance.defaults.headers.ETag = etag
      }
    }
    if (update) instance.defaults.headers.update = update
    instance.interceptors.request = axios.interceptors.request
    instance.interceptors.response = axios.interceptors.response
    // eslint-disable-next-line consistent-return
    return instance
  }

  // eslint-disable-next-line max-params, consistent-return
  const axiosReq = async (
    reducer,
    requestId,
    type,
    url,
    data = null,
    params = null,
    headers = null,
    update
  ) => {
    try {
      if (type === 'get')
        return await axiosWrapper(reducer, requestId, update, true)[type](url, {
          params
        })
      if (type === 'post')
        return await axiosWrapper(reducer, requestId)[type](url, data, headers)
      if (type === 'put')
        return await axiosWrapper(reducer, requestId)[type](url, data, headers)
      if (type === 'delete')
        return await axiosWrapper(reducer, requestId)[type](url)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return axiosReq
}
