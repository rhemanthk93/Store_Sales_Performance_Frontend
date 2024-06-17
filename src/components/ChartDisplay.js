import React from 'react';
import HighestPerHourSales from '../pages/HighestPerHourSales';

const ChartDisplay = ({ selectedChart }) => {
    const renderChart = () => {
        switch (selectedChart) {
            case 'highestPerHourSales':
                return <HighestPerHourSales />;
            case 'highestAvgSalesByDistrict':
                // Implement and import the component for this chart
                return <div>Highest Average Sales By District</div>;
            default:
                return <div>Select a chart to display</div>;
        }
    };

    return (
        <div className="chart-display">
            {renderChart()}
        </div>
    );
};

export default ChartDisplay;