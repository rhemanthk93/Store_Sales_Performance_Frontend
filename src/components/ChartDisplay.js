import React from 'react';
import CityPerHourSalesChart from './CityPerHourSalesChart';
import CityAvgSalesWithDistrictChart from './CityAvgSalesWithDistrictChart';

const ChartDisplay = ({ selectedChart }) => {
    return (
        <div className="chart-display">
            {selectedChart === 'cityPerHourSales' && <CityPerHourSalesChart />}
            {selectedChart === 'cityAvgSalesWithDistrict' && <CityAvgSalesWithDistrictChart />}
        </div>
    );
};

export default ChartDisplay;