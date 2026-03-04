const Filter = ({ filter, handleFilterChange }) => {
    return (
        <div className="filter-container">
            filter shown with <input className="form-input" value={filter} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter
