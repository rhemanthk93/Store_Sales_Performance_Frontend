// src/components/OrdersByRegionChart.js
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getOrdersByRegion } from '../api';
import './ChartDisplay.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrdersByRegionChart = () => {
    const [data, setData] = useState(null);
    const [displayCount, setDisplayCount] = useState('top10');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const salesData = await getOrdersByRegion();
                setData(salesData);
            } catch (error) {
                console.error('Error fetching orders by region:', error);
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
        labels: filterData(data).map(d => d.region),
        datasets: [
            {
                label: 'Order Count',
                data: filterData(data).map(d => d.order_count),
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            }
        ],
    } : {};

    return (
        <div className="chart-display">
            <h2>Orders by Region</h2>
            <p>
                This bar chart displays the number of orders for each region. The chart allows users to see the regions with the highest order counts.
            </p>
            <div className="controls">
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

export default OrdersByRegionChart;