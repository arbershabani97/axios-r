import _remove from 'lodash/remove'
import _union from 'lodash/union'
/*
 * Restful Reducer waits for the request to be completed in order to update the data
 * For using this refer to RestfulReducer.logic.md
 */
const RestfulState = { etag: '', pages: [], show: [], list: {} }
const RestfulReducer = {
  // eslint-disable-next-line max-params, max-statements
  get(state, action, modelFn, update) {
    const onceInEight = Math.floor(Math.random() * 8 + 1) === 1
    if (onceInEight) {
      // Just sample check in case something goes wrong
      state.show.forEach(
        (id) => !(id in state.list) && _remove(state.show, (_id) => _id === id)
      )
    }
    // Stop Execution if request doesn't succeed
    if (action.status !== 'success') return state
    // Set Current Etag
    state.etag = action.etag
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
    // Stop Execution if request doesn't succeed
    if (action.status !== 'success') return state
    // Show the new confirmed element on the list
    state.show = _union(state.show, [action.payload.id])
    // Show the new confirmed element on the list
    state.list[action.payload.id] = modelFn(action.payload)
    // Return the state
    return { ...state }
  },
  put(state, action, modelFn) {
    // Stop Execution if request doesn't succeed
    if (action.status !== 'success') return state
    // Update the current data
    const selectedTarget = state.list[action.payload.id]
    state.list[action.payload.id] = modelFn({
      ...selectedTarget,
      ...action.payload
    })
    // Return the state
    return { ...state }
  },
  delete(state, action) {
    // Stop Execution if request doesn't succeed
    if (action.status !== 'success') return state
    // Remove selected element from show list
    _remove(state.show, (id) => id === action.payload.id)
    // Remove the selected element completely
    delete state.list[action.payload.id]
    // Return the state
    return { ...state }
  }
}
export { RestfulReducer, RestfulState }
