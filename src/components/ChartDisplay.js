// src/components/ChartDisplay.js
import React from 'react';
import CityPerHourSalesChart from './CityPerHourSalesChart';
import CityAvgSalesWithDistrictChart from './CityAvgSalesWithDistrictChart';
import TimeBasedSalesTrendByCityChart from './TimeBasedSalesTrendByCityChart';
import TimeBasedOrderTrendByCityChart from './TimeBasedOrderTrendByCityChart';

const ChartDisplay = ({ selectedChart }) => {
    const renderChart = () => {
        switch (selectedChart) {
            case 'cityPerHourSales':
                return <CityPerHourSalesChart />;
            case 'cityAvgSalesWithDistrict':
                return <CityAvgSalesWithDistrictChart />;
            case 'timeBasedSalesTrendByCity':
                return <TimeBasedSalesTrendByCityChart />;
            case 'timeBasedOrderTrendByCity':
                return <TimeBasedOrderTrendByCityChart />;
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