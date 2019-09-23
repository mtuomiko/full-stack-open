import React, { useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {
  const { location, weather, setWeather } = props

  const accessKey = 'insert access key'
  const requestBase = 'http://api.weatherstack.com/current'

  const request = `${requestBase}?access_key=${accessKey}&query=${location}`

  useEffect(() => {
    axios
      .get(request)
      .then(response => {
        setWeather(response.data)
        console.log(response.data)
      })
  }, [request, setWeather])

  if (typeof weather == 'object') {
    return (
      <>
        <h4>Weather in {weather.location.name}</h4>
        <div><b>Temperature:</b> {weather.current.temperature} °C</div>
        <div>
          <b>Wind:</b>&nbsp;
          {weather.current.wind_speed} kph,
          direction {weather.current.wind_dir}
        </div>
        <div>
          <b>{weather.current.weather_descriptions}</b>&nbsp;
          <img id="weather-img"
            src={weather.current.weather_icons}
            alt={weather.current.weather_descriptions}
            width="40"
          />
        </div>
      </>
    )
  }

  return (
    <>

    </>
  )

}

export default Weather