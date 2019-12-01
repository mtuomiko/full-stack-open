import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('creating new anecdote', content)
    store.dispatch(createAnecdote(content))
    store.dispatch(showNotification('You created anecdote "' + content + '"'))
    setTimeout(() => {
      store.dispatch(clearNotification())
    }, 5000)
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={create}>
        <div><input name="anecdote" /></div>
        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
