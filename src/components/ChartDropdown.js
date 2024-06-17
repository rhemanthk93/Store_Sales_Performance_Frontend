import React from 'react';
import './ChartDropdown.css';

const ChartDropdown = ({ onSelect }) => {
    return (
        <div className="chart-dropdown">
            <label htmlFor="chart-select">Select Chart: </label>
            <select id="chart-select" onChange={(e) => onSelect(e.target.value)}>
                <option value="highestPerHourSalesByCity">City With Highest Average Per Hour Sales</option>
                <option value="highestAvgSalesByDistrict">Highest Average Sales By District</option>
                {/* Add more options as needed */}
            </select>
        </div>
    );
};

export default ChartDropdown;