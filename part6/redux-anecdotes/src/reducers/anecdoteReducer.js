import anecdoteService from '../services/anecdotes'

const sortByVotes = (state) => {
  state.sort((a, b) => b.votes - a.votes)
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const updatedAnecdote = action.data
      const anecdoteId = updatedAnecdote.id
      const votedState = state.map(anecdote => (anecdote.id !== anecdoteId) ? anecdote : updatedAnecdote)
      sortByVotes(votedState)
      return votedState

    case 'CREATE':
      const newState = [...state, action.data]
      sortByVotes(newState)
      return newState

    case 'INIT_ANECDOTES':
      const initState = [...action.data]
      sortByVotes(initState)
      return initState

    default:
      return state
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const modifiedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const returnedAnecdote = await anecdoteService.update(modifiedAnecdote.id, modifiedAnecdote)
    dispatch({
      type: 'VOTE',
      data: returnedAnecdote,
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer