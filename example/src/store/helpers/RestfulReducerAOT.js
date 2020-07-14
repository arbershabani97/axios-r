import _remove from 'lodash/remove'
import _union from 'lodash/union'
/*
 * AOT - Ahead of time (Update the data before receiving the response)
 * For using this refer to RestfulReducer.logic.md
 */
const RestfulStateAOT = { etag: '', pages: [], show: [], list: {} }
const RestfulReducerAOT = {
  // eslint-disable-next-line max-params,max-statements
  get(state, action, modelFn, update) {
    const onceInEight = Math.floor(Math.random() * 8 + 1) === 1
    if (onceInEight) {
      // Just sample check in case something goes wrong
      state.show.forEach(
        (id) => !(id in state.list) && _remove(state.show, (_id) => _id === id)
      )
    }
    // Stop execution if the request has failed
    if (action.status !== 'success') return state
    // Set Current Etag
    state.etag = (action.etag || '').replace(/^"(.*)"$/, '$1')
    // Reset Show and Pages when paginating
    if (update) {
      state.pages = []
      state.show = []
    }
    // Add Current Page to Pages
    const { currentPage = 0 } = action.payload?.meta || {}
    state.pages = _union(state.pages, [currentPage])
    // Add the data to the list
    action.payload.forEach((target) => {
      // Add Each Item to the List
      state.list[target.id] = modelFn(target)
      // Add Show Data
      state.show.push(target.id)
    })
    // Remove Duplicates
    state.show = [...new Set(state.show)]

    // Return the state
    return { ...state }
  },
  post(state, action, modelFn) {
    switch (action.status) {
      case 'request':
        // Show the new temporary element on the list
        state.show = _union(state.show, [action.requestId])
        // Add the new temporary element on the list
        state.list[action.requestId] = modelFn(action.payload)
        // Return the state
        return { ...state }

      case 'error':
        // Hide the new temporary element from the list
        _remove(state.show, (reqId) => reqId === action.requestId)
        // Remove the new temporary element from the list
        delete state.list[action.requestId]
        // Return the state
        return { ...state }

      case 'success':
        // Hide the new temporary element from the list
        _remove(state.show, (reqId) => reqId === action.requestId)
        // Remove the new temporary element from the list
        delete state.list[action.requestId]
        // Show the new confirmed element on the list
        state.show = _union(state.show, [action.payload.id])
        // Show the new confirmed element on the list
        state.list[action.payload.id] = modelFn(action.payload)
        // Return the state
        return { ...state }

      default:
        // Return the state
        return state
    }
  },
  put(state, action, modelFn) {
    const selectedTarget = state.list[action.payload.id]
    switch (action.status) {
      case 'request':
        // Update current data and save the previous data on backup
        state.list[action.payload.id] = modelFn({
          ...selectedTarget,
          ...action.payload,
          backup: selectedTarget
        })
        // Return the state
        return { ...state }

      case 'error':
        // Return the previous data
        state.list[action.payload.id] = modelFn(
          state.list[action.payload.id].backup
        )
        // Return the state
        return { ...state }

      case 'success':
        // Return the previous data
        delete state.list[action.payload.id].backup
        // Return the state
        return { ...state }

      default:
        // Return the state
        return state
    }
  },
  delete(state, action) {
    switch (action.status) {
      case 'request':
        // Remove selected element from show list
        _remove(state.show, (id) => id === action.payload.id)
        // Return the state
        return { ...state }

      case 'error':
        // Add selected element to the show list
        state.show = _union(state.show, [action.payload.id])
        // Return the state
        return { ...state }

      case 'success':
        // Remove the selected element completely
        delete state.list[action.payload.id]
        // Return the state
        return { ...state }

      default:
        // Return the state
        return state
    }
  }
}
export { RestfulReducerAOT, RestfulStateAOT }
