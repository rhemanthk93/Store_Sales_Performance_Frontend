import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { getHighestPerHourSales, getHighestAvgSales } from './api';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function App() {
  const [highestPerHourSales, setHighestPerHourSales] = useState(null);
  const [highestAvgSales, setHighestAvgSales] = useState(null);
  const [currency, setCurrency] = useState('USD');
  const [displayCount, setDisplayCount] = useState('top10'); // options: 'top5', 'top10', 'all'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const perHourSalesData = await getHighestPerHourSales();
        setHighestPerHourSales(perHourSalesData);

        const avgSalesData = await getHighestAvgSales();
        setHighestAvgSales(avgSalesData);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchData();
  }, []);

  const filterData = (data) => {
    if (displayCount === 'top5') {
      return data.slice(0, 5);
    } else if (displayCount === 'top10') {
      return data.slice(0, 10);
    } else {
      return data;
    }
  };

  const perHourSalesChartData = highestPerHourSales ? {
    labels: filterData(highestPerHourSales).map(data => data.city),
    datasets: [
      {
        label: `Average Hourly Sales (${currency})`,
        data: filterData(highestPerHourSales).map(data => currency === 'USD' ? data.avg_hourly_sales_usd : data.avg_hourly_sales_rmb),
        backgroundColor: currency === 'USD' ? 'rgba(75,192,192,0.4)' : 'rgba(255,99,132,0.4)',
        borderColor: currency === 'USD' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)',
        borderWidth: 1,
      }
    ],
  } : {};

  const avgSalesChartData = highestAvgSales ? {
    labels: filterData(highestAvgSales).map(data => data.city),
    datasets: [
      {
        label: `Average Sales (${currency})`,
        data: filterData(highestAvgSales).map(data => currency === 'USD' ? data.avg_sales_usd : data.avg_sales_rmb),
        backgroundColor: currency === 'USD' ? 'rgba(153,102,255,0.4)' : 'rgba(255,159,64,0.4)',
        borderColor: currency === 'USD' ? 'rgba(153,102,255,1)' : 'rgba(255,159,64,1)',
        borderWidth: 1,
      }
    ],
  } : {};

  return (
      <div className="App">
        <h1>Sales Performance Dashboard</h1>
        <div className="controls">
          <div className="currency-toggle">
            <button onClick={() => setCurrency('USD')}>USD</button>
            <button onClick={() => setCurrency('RMB')}>RMB</button>
          </div>
          <div className="display-count-toggle">
            <button onClick={() => setDisplayCount('top5')}>Top 5</button>
            <button onClick={() => setDisplayCount('top10')}>Top 10</button>
            <button onClick={() => setDisplayCount('all')}>Show All</button>
          </div>
        </div>
        <div className="chart-container">
          {highestPerHourSales && (
              <div className="chart">
                <h2>Highest Per Hour Sales</h2>
                <Line data={perHourSalesChartData} />
              </div>
          )}
          {highestAvgSales && (
              <div className="chart">
                <h2>Highest Average Sales by City</h2>
                <Line data={avgSalesChartData} />
              </div>
          )}
        </div>
      </div>
  );
}

export default App;