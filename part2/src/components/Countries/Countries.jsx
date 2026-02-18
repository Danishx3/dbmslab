import { useState, useEffect } from 'react'
import countryService from '../../services/countries'
import weatherService from '../../services/weather'

const Countries = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [selectedCountry, setSelectedCountry] = useState(null)

    useEffect(() => {
        countryService
            .getAll()
            .then(initialCountries => {
                setCountries(initialCountries)
            })
    }, [])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
        setSelectedCountry(null)
    }

    const handleShow = (country) => {
        setSelectedCountry(country)
    }

    const countriesToShow = filter
        ? countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
        : []

    return (
        <div>
            <h2>Countries</h2>
            <div>
                find countries <input value={filter} onChange={handleFilterChange} />
            </div>
            <Content
                countries={countriesToShow}
                selectedCountry={selectedCountry}
                handleShow={handleShow}
            />
        </div>
    )
}

const Content = ({ countries, selectedCountry, handleShow }) => {
    if (selectedCountry) {
        return <CountryDetail country={selectedCountry} />
    }

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (countries.length === 1) {
        return <CountryDetail country={countries[0]} />
    }

    return (
        <div>
            {countries.map(country =>
                <div key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => handleShow(country)}>show</button>
                </div>
            )}
        </div>
    )
}

const getWeatherIcon = (code) => {
    const iconMap = {
        0: '01d', // Clear
        1: '02d', // Mainly clear
        2: '03d', // Partly cloudy
        3: '04d', // Overcast
        45: '50d', 48: '50d', // Fog
        51: '09d', 53: '09d', 55: '09d', // Drizzle
        56: '09d', 57: '09d', // Freezing Drizzle
        61: '10d', 63: '10d', 65: '10d', // Rain
        66: '13d', 67: '13d', // Freezing Rain
        71: '13d', 73: '13d', 75: '13d', // Snow
        77: '13d', // Snow grains
        80: '09d', 81: '09d', 82: '09d', // Rain showers
        85: '13d', 86: '13d', // Snow showers
        95: '11d', 96: '11d', 99: '11d' // Thunderstorm
    }

    const iconCode = iconMap[code] || '01d' // Default to clear if unknown
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

const CountryDetail = ({ country }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        // Use capital coordinates if available, otherwise country coordinates
        const [lat, lon] = country.capitalInfo?.latlng || country.latlng || []

        if (lat && lon) {
            weatherService
                .getWeather(lat, lon)
                .then(data => {
                    setWeather(data)
                })
                .catch(error => {
                    console.log('Error fetching weather:', error)
                    setWeather(null) // Reset on error
                })
        }
    }, [country])

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages).map(language =>
                    <li key={language}>{language}</li>
                )}
            </ul>
            <img src={country.flags.png} alt={country.name.common} width="150" />

            {weather && (
                <div>
                    <h2>Weather in {country.capital}</h2>
                    <p>temperature {weather.current_weather.temperature} Celcius</p>
                    <img
                        src={getWeatherIcon(weather.current_weather.weathercode)}
                        alt="weather icon"
                    />
                    <p>wind {weather.current_weather.windspeed} m/s</p>
                </div>
            )}
        </div>
    )
}

export default Countries
