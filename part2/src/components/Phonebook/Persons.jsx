const Persons = ({ persons, deletePerson }) => {
    return (
        <div className="persons-list">
            {persons.map(person =>
                <div key={person.id} className="person-card">
                    <div className="person-info">
                        <span className="person-name">{person.name}</span>
                        <span className="person-number">{person.number}</span>
                        <span className="person-place">{person.place}</span>
                    </div>
                    <button className="btn btn-danger" onClick={() => deletePerson(person.id)}>delete</button>
                </div>
            )}
        </div>
    )
}

export default Persons
