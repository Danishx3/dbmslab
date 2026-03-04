import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from '../../services/persons'

const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    return (
        <div className={`notification ${notification.type}`}>
            {notification.message}
        </div>
    )
}

const Phonebook = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newPlace, setNewPlace] = useState('')
    const [filter, setFilter] = useState('')
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const notify = (message, type = 'success') => {
        setNotification({ message, type })
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const existingPerson = persons.find(p => p.name === newName)

        if (existingPerson) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const changedPerson = { ...existingPerson, number: newNumber }
                personService
                    .update(existingPerson.id, changedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
                        setNewName('')
                        setNewNumber('')
                        notify(`Updated ${newName}`)
                    })
                    .catch(error => {
                        const message = error.response && error.response.data && error.response.data.error
                            ? error.response.data.error
                            : `Information of ${newName} has already been removed from server`
                        notify(message, 'error')
                        if (!error.response || error.response.status === 404) {
                            setPersons(persons.filter(p => p.id !== existingPerson.id))
                        }
                    })
            }
        } else {
            const personObject = {
                name: newName,
                number: newNumber,
                place: newPlace,
            }

            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    notify(`Added ${newName}`)
                })
                .catch(error => {
                    const message = error.response && error.response.data && error.response.data.error
                        ? error.response.data.error
                        : 'Failed to add person'
                    notify(message, 'error')
                })
        }
    }

    const deletePerson = (id) => {
        const person = persons.find(p => p.id === id)
        if (window.confirm(`Delete ${person.name}?`)) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== id))
                    notify(`Deleted ${person.name}`)
                })
                .catch(error => {
                    notify(`Information of ${person.name} has already been removed from server`, 'error')
                    setPersons(persons.filter(p => p.id !== id))
                })
        }
    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)
    const handlePlaceChange = (event) => setNewPlace(event.target.value)
    const handleFilterChange = (event) => setFilter(event.target.value)

    const personsToShow = filter
        ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
        : persons

    return (
        <div className="phonebook-wrapper">
            <div className="phonebook-container">
                <h2 className="app-title">Phonebook</h2>
                <Notification notification={notification} />
                <Filter filter={filter} handleFilterChange={handleFilterChange} />

                <div className="section">
                    <h3 className="section-title">Add a new</h3>
                    <PersonForm
                        addPerson={addPerson}
                        newName={newName}
                        handleNameChange={handleNameChange}
                        newNumber={newNumber}
                        handleNumberChange={handleNumberChange}
                        newPlace={newPlace}
                        handlePlaceChange={handlePlaceChange}
                    />
                </div>

                <div className="section">
                    <h3 className="section-title">Numbers</h3>
                    <Persons persons={personsToShow} deletePerson={deletePerson} />
                </div>
            </div>
        </div>
    )
}

export default Phonebook
