import React from 'react'
import Country from './Country'
import CountryDetail from './CountryDetail'

const Countries = (props) => {
  const {
    countries,
    filter,
    currentCountry,
    setShowCountry,
    weather,
    setWeather
  } = props

  const filteredCountries = (filter.length === 0)
    ? countries
    : countries.filter(country => {
      const lowerCaseCountryName = country.name.toLowerCase()
      const lowerCaseFilter = filter.toLowerCase()
      return (
        lowerCaseCountryName.includes(lowerCaseFilter)
      )
    })

  if (filteredCountries.length > 10) {
    return (
      <div>
        Too many results, try a longer search string
      </div>
    )
  }

  if (typeof currentCountry == 'object') {
    return (
      <div>
        <CountryDetail
          country={currentCountry}
          weather={weather}
          setWeather={setWeather}
        />
      </div>
    )
  }

  if (filteredCountries.length === 1) {
    return (
      <div>
        <CountryDetail
          country={filteredCountries[0]}
          weather={weather}
          setWeather={setWeather}
        />
      </div>
    )
  }

  return (
    <ul>
      {filteredCountries.map(country =>
        <Country
          key={country.name}
          country={country}
          setShowCountry={setShowCountry}
        />
      )}
    </ul>
  )

}

export default Countries