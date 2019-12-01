import React from 'react'

const Notification = (props) => {
  const state = props.store.getState()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (state.notification === '') {
    return null
  }

  return (
    <div style={style}>
      {props.store.getState().notification}
    </div>
  )
}

export default Notification