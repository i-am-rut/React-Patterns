import { useEffect, useState } from "react"

const useWeatherInfo = (query) => {
    const [weather, setWeather] = useState(null)
    const [message, setMessage] = useState("")

    const ACCESS_KEY = import.meta.env.VITE_WEATHER_ACCESS_KEY

    const getWeather = async (location) => {
        try {
            const res = await fetch('https://api.openweathermap.org/data/2.5/weather?' + location + '&APPID=' + ACCESS_KEY + '&units=metric')

            const json = await res.json()

            if(json.cod !== 200) {
                setMessage(json.message || 'Failed to fetch weather')
                setWeather(null)
            }else {
                setWeather(json)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        if(!query) return

        const string = query.lat? `lat=${query.lat}&lon=${query.lon}` : `q=${query}`

        getWeather(string)

    }, [typeof query === "string" ? query : JSON.stringify(query)])

    return [weather, message]

}

export default useWeatherInfo