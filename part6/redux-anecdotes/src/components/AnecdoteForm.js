import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.showNotification(`You created anecdote "${content}"`, 5)
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

const mapDispatchToProps = {
  createAnecdote,
  showNotification,
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps,
)(AnecdoteForm)

export default ConnectedAnecdoteForm
