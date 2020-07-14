/* eslint-disable no-case-declarations, max-statements */
const _dispatcher = (Actions) => {
  return (status, data) => {
    const { method } = data.config
    const { reducer, action, requestId } = data.config
      ? data.config.headers
      : {}

    const instance = Actions[reducer]
    if (!instance) return

    const payloadData = data.config.data || null
    let payload =
      status === 'success' || status === 'error'
        ? JSON.parse(payloadData)
        : payloadData

    switch (method) {
      case 'get':
        if (status === 'success') {
          if (reducer.endsWith('s')) {
            instance[action]({
              payload: data.data,
              status,
              etag: data.headers.etag
            })
          } else {
            instance[action](data.data.data || data.data)
          }
        }
        break

      case 'post':
        if (status === 'success') payload = data.data.data
        if (data.config.data) instance[action]({ payload, status, requestId })
        break

      case 'put':
        const singleInstance = Actions[reducer.slice(0, -1)]

        if (status === 'success' && singleInstance)
          singleInstance[action](payload)
        if (payload) instance[action]({ payload, status, requestId })
        break

      case 'delete':
        instance[action]({
          payload: { id: Number(data.config.url.split('/').slice(-1)[0]) },
          status,
          requestId
        })
        break

      default:
    }
  }
}

export default _dispatcher
