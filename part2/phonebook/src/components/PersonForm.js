import React from 'react'

const PersonForm = (props) => {
  const {newName, handleNameChange, newNumber, handleNumberChange, addPerson} = props

  return (
    <form onSubmit={addPerson}>
      <div>
        Name:&nbsp;
        <input 
          value={newName} 
          onChange={handleNameChange}
        />
      </div>
      <div>
        Number:&nbsp;
        <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default PersonForm