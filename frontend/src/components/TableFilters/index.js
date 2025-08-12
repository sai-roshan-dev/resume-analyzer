import React from 'react';
import './index.css';

const TableFilters = ({ onFilterChange }) => {
    // This is a placeholder component for now. The logic for filtering
    // will be added when we connect to the backend.
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Call the parent's filter function with the new values
        // onFilterChange({ [name]: value });
    };

    return (
        <div className="filters-container">
            <div className="filter-group">
                <label htmlFor="search" className="filter-label">Search by File Name</label>
                <input
                    id="search"
                    name="search"
                    type="text"
                    className="filter-input"
                    placeholder="e.g., 'John Doe'"
                    onChange={handleInputChange}
                />
            </div>
            {/* Other filters like date range or rating can be added here */}
        </div>
    );
};

export default TableFilters;
