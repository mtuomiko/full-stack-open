import React, { useState } from 'react'

const Persons = (props) => {
  const {persons, filter} = props
  const visiblePersons = (filter.length === 0) 
    ? persons
    : persons.filter(person => {
      const lowerCaseName = person.name.toLowerCase()
      const lowerCaseFilter = filter.toLowerCase()
      return (
        lowerCaseName.includes(lowerCaseFilter)
      )
    })

  return (
    <ul>
      {visiblePersons.map(person => 
          <li key={person.name}>{person.name} {person.number}</li>
      )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas', 
      number: '040-123456' 
    },
    { 
      name: 'Ada Lovelace', 
      number: '39-44-5323523' 
    },
    { 
      name: 'Dan Abramov', 
      number: '12-43-234345' 
    },
    { 
      name: 'Mary Poppendieck', 
      number: '39-23-6423122' 
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName) !== undefined) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter names with&nbsp;
        <input
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <h2>Add new data</h2>
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
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App