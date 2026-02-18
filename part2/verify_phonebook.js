import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const verify = async () => {
    try {
        console.log('Fetching all persons...')
        const response = await axios.get(baseUrl)
        console.log('Current persons:', response.data)

        console.log('Adding a new person...')
        const newPerson = { name: 'Verification Person', number: '123-456-7890' }
        const createResponse = await axios.post(baseUrl, newPerson)
        console.log('Added person:', createResponse.data)

        console.log('Fetching all persons again...')
        const response2 = await axios.get(baseUrl)
        console.log('All persons after addition:', response2.data)

        // Clean up
        console.log('Deleting verification person...')
        await axios.delete(`${baseUrl}/${createResponse.data.id}`)
        console.log('Verification person deleted.')

    } catch (error) {
        console.error('Verification failed:', error.message)
    }
}

verify()
