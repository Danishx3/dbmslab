import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const checkStructure = async () => {
    try {
        const response = await axios.get(baseUrl)
        const country = response.data.find(c => c.name.common === 'Finland')
        console.log('Capital:', country.capital)
        console.log('Capital Info:', country.capitalInfo)
        console.log('Lat/Lng:', country.latlng)
    } catch (error) {
        console.error(error)
    }
}

checkStructure()
