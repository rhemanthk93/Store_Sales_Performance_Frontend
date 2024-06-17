import React, { useState } from 'react';
import CityPerHourSalesChart from './CityPerHourSalesChart';
import CityAvgSalesWithDistrictChart from './CityAvgSalesWithDistrictChart';
import TimeBasedSalesTrendByCityChart from './TimeBasedSalesTrendByCityChart';
import TimeBasedOrderTrendByCityChart from './TimeBasedOrderTrendByCityChart';
import OrdersByRegionChart from './OrdersByRegionChart';
import SalesTiersChart from './SalesTiersChart';
import OrderTimingClusteringChart from './OrderTimingClusteringChart';
import './ChartDisplay.css';

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
            case 'ordersByRegion':
                return <OrdersByRegionChart />;
            case 'salesTiers':
                return <SalesTiersChart />;
            case 'orderTimingClustering':
                return <OrderTimingClusteringChart />;
            default:
                return <CityPerHourSalesChart />;
        }
    };

    return <div className="chart-display">{renderChart()}</div>;
};

export default ChartDisplay;