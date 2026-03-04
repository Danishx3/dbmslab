const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange, newPlace, handlePlaceChange }) => {
    return (
        <form className="person-form" onSubmit={addPerson}>
            <div className="form-group">
                <span className="input-label">name:</span> <input className="form-input" value={newName} onChange={handleNameChange} />
            </div>
            <div className="form-group">
                <span className="input-label">number:</span> <input className="form-input" value={newNumber} onChange={handleNumberChange} />
            </div>
            <div className="form-group">
                <span className="input-label">place:</span> <input className="form-input" value={newPlace} onChange={handlePlaceChange} />
            </div>
            <div className="form-action">
                <button className="btn btn-primary" type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
