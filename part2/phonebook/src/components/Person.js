import React from 'react'

const Person = (props) => {
  const {person, removePerson} = props

  return (
    <li>
      {person.name} {person.number} 
      <button onClick={removePerson}>Delete</button>
    </li>
  )
}

export default Person