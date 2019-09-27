import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: null })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const showNotification = (message, type) => {
    const notificationToShow = { message, type }
    setNotification(notificationToShow)
    setTimeout(() => {
      setNotification({ message: null })
    }, 8000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson !== undefined) {
      const confirm = window.confirm(`${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`)
      if (confirm) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => (person.id !== existingPerson.id)
              ? person
              : returnedPerson))
            showNotification(`Updated phone number for ${existingPerson.name}`)
          })
          .catch(error => {
            //setPersons(persons.filter(person => person.id !== existingPerson.id))
            showNotification(`Unable to update ${existingPerson.name}. Updating is not yet supported.`, 'error')
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          showNotification(`Added ${returnedPerson.name}`)
        })
    }
  }

  const removePerson = (id) => {
    const personName = persons.find(person => person.id === id).name
    const confirm = window.confirm(`Really delete ${personName}?`)
    if (confirm) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          showNotification(`Deleted ${personName}`)
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        notification={notification}
      />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add new data</h2>
      <PersonForm
        newname={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App