import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getCityPerHourSales } from '../api';
import './ChartDisplay.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CityPerHourSalesChart = () => {
    const [data, setData] = useState(null);
    const [currency, setCurrency] = useState('USD');
    const [displayCount, setDisplayCount] = useState('top10');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const salesData = await getCityPerHourSales();
                setData(salesData);
            } catch (error) {
                console.error('Error fetching highest per hour sales:', error);
            }
        };

        fetchData();
    }, []);

    const filterData = (data) => {
        if (!data) return [];
        if (displayCount === 'top5') {
            return data.slice(0, 5);
        } else if (displayCount === 'top10') {
            return data.slice(0, 10);
        } else {
            return data;
        }
    };

    const chartData = data ? {
        labels: filterData(data).map(d => d.city),
        datasets: [
            {
                label: `Average Hourly Sales (${currency})`,
                data: filterData(data).map(d => currency === 'USD' ? d.avg_hourly_sales_usd : d.avg_hourly_sales_rmb),
                backgroundColor: currency === 'USD' ? 'rgba(75,192,192,0.4)' : 'rgba(255,99,132,0.4)',
                borderColor: currency === 'USD' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)',
                borderWidth: 1,
            }
        ],
    } : {};

    return (
        <div className="chart-display">
            <h2>City With Average Per Hour Sales</h2>
            <p>
                This graph displays the cities with the average hourly sales from 5am to 12pm. The data is presented in both USD and RMB. The chart allows users to see the top-performing cities based on their sales performance during this time period.
            </p>
            <div className="controls">
                <div className="currency-toggle">
                    <button onClick={() => setCurrency('USD')} className={currency === 'USD' ? 'active' : ''}>USD</button>
                    <button onClick={() => setCurrency('RMB')} className={currency === 'RMB' ? 'active' : ''}>RMB</button>
                </div>
                <div className="display-count-toggle">
                    <button onClick={() => setDisplayCount('top5')} className={displayCount === 'top5' ? 'active' : ''}>Top 5</button>
                    <button onClick={() => setDisplayCount('top10')} className={displayCount === 'top10' ? 'active' : ''}>Top 10</button>
                    <button onClick={() => setDisplayCount('all')} className={displayCount === 'all' ? 'active' : ''}>Show All</button>
                </div>
            </div>
            {data && (
                <div className="chart">
                    <Bar data={chartData} />
                </div>
            )}
        </div>
    );
};

export default CityPerHourSalesChart;