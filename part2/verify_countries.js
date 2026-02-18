import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const verify = async () => {
    try {
        console.log('Fetching all countries...')
        const response = await axios.get(baseUrl)
        console.log(`Fetched ${response.data.length} countries.`)
        console.log('First country:', response.data[0].name.common)

    } catch (error) {
        console.error('Verification failed:', error.message)
    }
}

verify()
