// src/components/ChartDisplay.js
import React from 'react';
import CityPerHourSalesChart from './CityPerHourSalesChart';
import CityAvgSalesWithDistrictChart from './CityAvgSalesWithDistrictChart';
import TimeBasedSalesTrendByCityChart from "./TimeBasedSalesTrendByCityChart";

const ChartDisplay = ({ selectedChart }) => {
    const renderChart = () => {
        switch (selectedChart) {
            case 'cityPerHourSales':
                return <CityPerHourSalesChart />;
            case 'cityAvgSalesWithDistrict':
                return <CityAvgSalesWithDistrictChart />;
            case 'timeBasedSalesTrendByCity':
                return <TimeBasedSalesTrendByCityChart />;
            default:
                return <CityPerHourSalesChart />;
        }
    };

    return (
        <div>
            {renderChart()}
        </div>
    );
};

export default ChartDisplay;