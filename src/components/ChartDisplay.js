// src/components/ChartDisplay.js
import React from 'react';
import CityPerHourSalesChart from './CityPerHourSalesChart';
import CityAvgSalesWithDistrictChart from './CityAvgSalesWithDistrictChart';
import TimeBasedSalesTrendByCityChart from './TimeBasedSalesTrendByCityChart';
import TimeBasedOrderTrendByCityChart from './TimeBasedOrderTrendByCityChart';
import OrdersByRegionChart from './OrdersByRegionChart';

const ChartDisplay = ({ selectedChart }) => {
    const renderChart = () => {
        switch (selectedChart) {
            case 'cityPerHourSales':
                return <CityPerHourSalesChart />;
            case 'cityAvgSalesWithDistrict':
                return <CityAvgSalesWithDistrictChart />;
            case 'timeBasedSalesTrend':
                return <TimeBasedSalesTrendByCityChart />;
            case 'timeBasedOrderTrendByCity':
                return <TimeBasedOrderTrendByCityChart />;
            case 'ordersByRegion':
                return <OrdersByRegionChart />;
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