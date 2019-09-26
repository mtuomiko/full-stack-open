import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [currentCountry, setCurrentCountry] = useState('')
  const [weather, setWeather] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setCurrentCountry('')
    setWeather('')
    return setFilter(event.target.value)
  }

  const setShowCountry = (country) => setCurrentCountry(country)

  return (
    <div>
      <h2>Search countries</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Results</h2>
      <Countries
        countries={countries}
        filter={filter}
        currentCountry={currentCountry}
        setShowCountry={setShowCountry}
        weather={weather}
        setWeather={setWeather}
      />
    </div>
  )
}

export default App