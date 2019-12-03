import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const { visibleAnecdotes } = props

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    props.voteAnecdote(anecdote.id)
    props.showNotification('You voted for anecdote "' + anecdote.content + '"')
    setTimeout(() => {
      props.clearNotification('You voted for anecdote "' + anecdote.content + '"')
    }, 5000)
  }
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

const visibleAnecdotes = ({ anecdotes, filter }) => {
  return (filter === '')
    ? anecdotes
    : anecdotes.filter(anecdote => {
      const lowerCaseAnecdote = anecdote.content.toLowerCase()
      const lowerCaseFilter = filter //.toLowerCase()
      return (
        lowerCaseAnecdote.includes(lowerCaseFilter)
      )
    })
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: visibleAnecdotes(state)
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  showNotification,
  clearNotification,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList