import React from 'react';
import { voteAnecdote, createAnecdote } from './reducers/anecdoteReducer'

const App = (props) => {
  const store = props.store
  const anecdotes = props.store.getState()

  const vote = (id) => {
    console.log('vote', id)
    store.dispatch(voteAnecdote(id))
  }

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('creating new anecdote', content)
    store.dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes&nbsp;
            <button onClick={() => vote(anecdote.id)}>Vote</button>
          </div>
          <div>
            <span role="img" aria-label="Coffee mug">☕</span>
          </div>
        </div>
      )}
      <h2>Create new</h2>
      <form onSubmit={create}>
        <div><input name="anecdote" /></div>
        <button type="sumit">Create</button>
      </form>
    </div>
  )
}

export default App