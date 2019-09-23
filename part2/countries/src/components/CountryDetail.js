import React from 'react'
import Weather from './Weather'

const CountryDetail = (props) => {
  const { country, weather, setWeather } = props

  return (
    <>
      <h3>{country.name}</h3>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h4>Languages</h4>
      <ul>
        {country.languages.map(language =>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <h4>Flag</h4>
      <img src={country.flag} alt={country.name + " flag"} width="400" />
      <Weather
        location={country.capital}
        weather={weather}
        setWeather={setWeather}
      />
    </>
  )
}

export default CountryDetail