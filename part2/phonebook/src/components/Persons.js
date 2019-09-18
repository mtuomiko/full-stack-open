import React from 'react'
import Person from './Person'

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
          <Person key={person.name} person={person} />
      )}
    </ul>
  )
}

export default Persons