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
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const showInfo = (message) => {
    setNotificationType('info')
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const showError = (message) => {
    setNotificationType('error')
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
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
            showInfo(`Updated phone number for ${existingPerson.name}`)
          })
          .catch(error => {
            setPersons(persons.filter(person => person.id !== existingPerson.id))
            showError(`${existingPerson.name} was already deleted from server so unable to update, removing from list`)
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          showInfo(`Added ${returnedPerson.name}`)
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
          showInfo(`Deleted ${personName}`)
        })
        .catch(error => {
          setPersons(persons.filter(person => person.id !== id))
          showError(`${personName} was already deleted from server, removing from list`)
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
        message={notification}
        notificationType={notificationType}
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