import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {
  const initialDispatch = props.initializeAnecdotes
  useEffect(() => {
    initialDispatch()
  }, [initialDispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <Filter />
      <AnecdoteForm />
    </div>
  )
}

const mapDispatchToProps = {
  initializeAnecdotes,
}

const ConnectedApp = connect(
  null,
  mapDispatchToProps,
)(App)

export default ConnectedApp