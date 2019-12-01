const filterReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }

}

export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    filter: filter,
  }
}

export default filterReducer