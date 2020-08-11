const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

/* eslint-disable no-case-declarations, max-statements */
const _dispatcher = (Actions) => {
  return (status, data) => {
    const { method } = data.config
    const { reducer, action, extras = null, requestId } = data.config
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
              etag: data.headers.etag,
              extras
            })
          } else {
            instance[action]({ payload: data.data.data || data.data, extras })
          }
        }
        break

      case 'post':
        if (status === 'success') payload = data.data.data
        if (data.config.data)
          instance[action]({ payload, status, requestId, extras })
        break

      case 'put':
        const actionName = reducer.slice(0, -1)
        const singleInstance = Actions[actionName]

        if (status === 'success' && singleInstance)
          singleInstance['update' + capitalize(actionName)](payload)
        if (payload) instance[action]({ payload, status, requestId, extras })
        break

      case 'delete':
        instance[action]({
          payload: { id: Number(data.config.url.split('/').slice(-1)[0]) },
          status,
          requestId,
          extras
        })
        break

      default:
    }
  }
}

export default _dispatcher
