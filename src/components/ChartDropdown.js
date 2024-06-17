import React from 'react';
import './ChartDropdown.css';

const ChartDropdown = ({ onSelect }) => {
    return (
        <div className="chart-dropdown">
            <label htmlFor="chart-select">Select Chart: </label>
            <select id="chart-select" onChange={(e) => onSelect(e.target.value)}>
                <option value="cityPerHourSales">City With Average Per Hour Sales</option>
                <option value="cityAvgSalesWithDistrict">City With Average Sales</option>
                <option value="timeBasedSalesTrendByCity">Time-Based Sales Trend By City</option>
                <option value="timeBasedOrderTrendByCity">Time-Based Order Trend by City</option>
                <option value="ordersByRegion">Orders by Region</option>
            </select>
        </div>
    );
};

export default ChartDropdown;