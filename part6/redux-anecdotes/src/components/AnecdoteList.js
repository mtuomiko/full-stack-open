import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const { anecdotes, filter } = store.getState()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    store.dispatch(voteAnecdote(anecdote.id))
    store.dispatch(showNotification('You voted for anecdote "' + anecdote.content + '"'))
    setTimeout(() => {
      store.dispatch(clearNotification('You voted for anecdote "' + anecdote.content + '"'))
    }, 5000)
  }

  const visibleAnecdotes = (filter === '')
    ? anecdotes
    : anecdotes.filter(anecdote => {
      const lowerCaseAnecdote = anecdote.content.toLowerCase()
      const lowerCaseFilter = filter //.toLowerCase()
      return (
        lowerCaseAnecdote.includes(lowerCaseFilter)
      )
    })


  return (
    <>
      {visibleAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes&nbsp;
          <button onClick={() => vote(anecdote)}>Vote</button>
          </div>
          <div>
            <span role="img" aria-label="Coffee mug">☕</span>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList