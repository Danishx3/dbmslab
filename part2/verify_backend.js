import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const verify = async () => {
    try {
        console.log('Fetching all notes...')
        const response = await axios.get(baseUrl)
        console.log('Current notes:', response.data)

        console.log('Adding a new note...')
        const newNote = { content: 'Verification note', important: true }
        const createResponse = await axios.post(baseUrl, newNote)
        console.log('Added note:', createResponse.data)

        console.log('Fetching all notes again...')
        const response2 = await axios.get(baseUrl)
        console.log('All notes after addition:', response2.data)

        // Clean up
        console.log('Deleting verification note...')
        await axios.delete(`${baseUrl}/${createResponse.data.id}`)
        console.log('Verification note deleted.')

    } catch (error) {
        console.error('Verification failed:', error.message)
    }
}

verify()
