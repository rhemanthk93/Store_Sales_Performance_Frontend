import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getHighestPerHourSalesByCity } from '../api';
import './HighestPerHourSalesByCity.css';

// Register the components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HighestPerHourSalesByCity = () => {
    const [data, setData] = useState(null);
    const [currency, setCurrency] = useState('USD');
    const [displayCount, setDisplayCount] = useState('top10');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const salesData = await getHighestPerHourSalesByCity();
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
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            }
        ],
    } : {};

    return (
        <div className="insight-container">
            <h2>Highest Per Hour Sales by City</h2>
            <div className="controls">
                <div className="currency-toggle">
                    <button onClick={() => setCurrency('USD')} className={currency === 'USD' ? 'active' : ''}>USD</button>
                    <button onClick={() => setCurrency('RMB')} className={currency === 'RMB' ? 'active' : ''}>RMB</button>
                </div>
                <div className="display-count-toggle">
                    <button onClick={() => setDisplayCount('top5')}>Top 5</button>
                    <button onClick={() => setDisplayCount('top10')}>Top 10</button>
                    <button onClick={() => setDisplayCount('all')}>Show All</button>
                </div>
            </div>
            {data && (
                <div className="chart">
                    <Line data={chartData} />
                </div>
            )}
        </div>
    );
};

export default HighestPerHourSalesByCity;