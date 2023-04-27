let nextTodoId = 0
export const updatePlayer = (newPlayer) => {
  return {
    type: 'UPDATE_PLAYER',
    newPlayer
  }
}

export const getDailyTracks = () => {
  return {
    type: 'GET_DAILY_TRACKS',
  }
}
export const addTodo = text => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

export const setVisibilityFilter = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleTodo = id => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

export const clearAll = () => {
  return {
    type: 'CLEAR_ALL'
  }
}