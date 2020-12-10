import { combineReducers } from 'redux'
import settings from './settingsReducers'
import lists from './listsReducers'


const rootReducers = combineReducers({
  settings,
  lists,
})

export default rootReducers