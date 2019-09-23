import React from 'react'

const Country = (props) => {
  const { country, setShowCountry } = props

  return (
    <li>
      {country.name}
      <button onClick={() => setShowCountry(country)}>show</button>
    </li>
  )
}

export default Country