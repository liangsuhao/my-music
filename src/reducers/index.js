import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import player from './player'
import state from './state'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  player,
  state
})

export default todoApp