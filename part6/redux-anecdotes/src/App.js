import React from 'react';
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = (props) => {
  const store = props.store
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification store={store} />
      <AnecdoteList store={store} />
      <AnecdoteForm store={store} />
      <Filter store={store} />
    </div>
  )
}

export default App