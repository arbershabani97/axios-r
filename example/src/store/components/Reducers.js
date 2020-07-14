import { combineReducers } from 'redux'

import note from './note/note.reducer'
import notes from './notes/notes.reducer'
import project from './project/project.reducer'
import projects from './projects/projects.reducer'

const appReducer = combineReducers({
  projects,
  project,
  notes,
  note
})
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    // eslint-disable-next-line no-undefined
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
