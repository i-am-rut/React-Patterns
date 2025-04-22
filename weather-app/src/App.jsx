import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [weather, setWeather] = useState(null)
  const [message, setMessage] = useState("")

  const ACCESS_KEY = import.meta.env.VITE_WEATHER_ACCESS_KEY

  const getWeather = async (location) => {
    setLoading(true)
      try {
          const res = await fetch('https://api.openweathermap.org/data/2.5/weather?' + location + '&APPID=' + ACCESS_KEY + '&units=metric')

          const json = await res.json()

          if(json.cod !== 200) {
              setMessage(json.message || 'Failed to fetch weather')
              setWeather(null)
          }else {
              setWeather(json)
              setLocation(json.name)
          }
      } catch (error) {
          console.error(error.message)
      } finally {
        setLoading(false)
      }
  }
  
  const handleClick = () => {
    getWeather(`q=${input}`)
    setMessage(null)
    setInput("")
  }

  const getlocation = () => {
    setLoading(true)
    if(!navigator.geolocation) {
      return setError("Geolocation is not supported by your browser")
    }

    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
      setError(null)
      setLoading(false)
    }, (error) => {
      setLoading(true)
      let message = "";
      switch (error.code) {
        case 1:
          message = "Permission denied. Please allow location access.";
          break;
        case 2:
          message = "Position unavailable. Make sure location services are enabled.";
          break;
        case 3:
          message = "Request timed out. Try again.";
          break;
        default:
          message = "An unknown error occurred.";
      }

      setError(message);
      setLocation(null);
      setLoading(false)
    }, {
      enableHighAccuracy: true,
    })

  }

  useEffect(() => {
    getlocation()
  }, [])

  useEffect (() => {
    if(!location) return
    if(!location.lat) return 

    getWeather(`lat=${location.lat}&lon=${location.lon}`)

  }, [location])

  const timezone = (num) => {
    const a = num >=0 ? num : num * -1
    
    const hours = Math.floor(a/3600)
    const minutes = ((a/3600) - hours) * 60

    return num > 0? `GMT + ${hours}:${minutes}` : `GMT - ${hours}:${minutes < 10 ? "0"+minutes : minutes}`

  }

  const timestampToTime = (timestamp) => {
    const bike = new Date(timestamp * 1000)
    const time = bike.toLocaleString().split(",")[1]
    return time
  }

  return (
    <div>
      <div className='title'>Weather App</div>
      {location && (<div className='title-container'>
        <h1 className='city'>{location.lat? null : location} </h1>
        {weather && <span className='normal'>({timezone(weather?.timezone)})</span>}
      </div>)}
      {error && <p className='error'>{error}</p>}
      <div className='input-container'>
        <input
          className='city-input'
          value={input}
          onChange={(e) => setInput(e.target.value)} 
          placeholder='Enter City name' />
        <button onClick={handleClick}>Get weather</button>
      </div>
      {message && <div className='message'>⚠️ {message.toLocaleUpperCase()}</div>}
      {loading ? <progress></progress> :
        weather && (
          <div>
            <div>
              <h1>{weather?.main?.temp}° C</h1>
              <p>Feels like: <span className='special'>{weather?.main?.feels_like}° C</span></p>
              <p>{weather?.weather[0]?.description}</p>
            </div>
            <div className='flex'>
              <p>Max: <span className='special'>{weather?.main?.temp_min}° C</span></p>
              <p>Max: <span className='special'>{weather?.main?.temp_max}° C</span></p>
            </div>
            <div className='flex'>
              <p>Pressure: <span className='special'>{(weather?.main?.pressure / 1000).toFixed(2)} bar
              </span></p>
              <p>Humidity: <span className='special'>{weather?.main?.humidity}%</span></p>
            </div>
            <div className='flex'>
              <p>Sunrise: <span className='special'>{timestampToTime(weather?.sys?.sunrise)}</span></p>
              <p>Sunset: <span className='special'>{timestampToTime(weather?.sys?.sunset)}</span></p>
            </div>
            <div className='flex'>
              <p>Wind: <span className='special'>{weather?.wind?.speed} Km/hr</span></p>
              <p>Visibility: <span className='special'>{(weather?.visibility / 1000).toFixed(2)} Km(s)</span></p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default App
