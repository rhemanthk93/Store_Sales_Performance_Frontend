// src/components/TimeBasedOrderTrendByCityChart.js
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getTimeBasedOrderTrendByCity } from '../api';
import './ChartDisplay.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TimeBasedOrderTrendByCityChart = () => {
    const [data, setData] = useState(null);
    const [displayCount, setDisplayCount] = useState('top100');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const salesData = await getTimeBasedOrderTrendByCity();
                setData(salesData);
            } catch (error) {
                console.error('Error fetching time-based order trend:', error);
            }
        };

        fetchData();
    }, []);

    const processChartData = (data) => {
        if (!data) return {};

        const hours = Array.from({ length: 8 }, (_, i) => i + 5); // [5, 6, 7, ..., 12]
        const cities = [...new Set(data.map(d => d.city))];

        const cityOrderCounts = cities.map(city => {
            const cityData = data.filter(d => d.city === city);
            const totalOrders = cityData.reduce((sum, d) => sum + d.order_count, 0);
            return { city, totalOrders };
        });

        // Sort cities based on total orders
        cityOrderCounts.sort((a, b) => b.totalOrders - a.totalOrders);

        // Filter cities based on the displayCount
        const filteredCities = filterData(cityOrderCounts).map(d => d.city);

        const datasets = filteredCities.map(city => {
            const cityData = data.filter(d => d.city === city);
            return {
                label: city,
                data: hours.map(hour => {
                    const hourData = cityData.find(d => d.hour === hour);
                    return hourData ? hourData.order_count : 0;
                }),
                fill: false,
                borderColor: getRandomColor(),
                tension: 0.1,
            };
        });

        return {
            labels: hours.map(hour => `${hour}:00 - ${hour + 1}:00`),
            datasets: datasets,
        };
    };

    const filterData = (cityOrderCounts) => {
        if (displayCount === 'top5') {
            return cityOrderCounts.slice(0, 5);
        } else if (displayCount === 'top10') {
            return cityOrderCounts.slice(0, 10);
        } else if (displayCount === 'top100') {
            return cityOrderCounts.slice(0, 100);
        } else {
            return cityOrderCounts;
        }
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div className="chart-display">
            <h2>Time-Based Order Trend by City</h2>
            <p>
                This line chart displays the order trend for different cities from 5am to 12pm.
            </p>
            <div className="controls">
                <div className="display-count-toggle">
                    <button onClick={() => setDisplayCount('top5')} className={displayCount === 'top5' ? 'active' : ''}>Top 5</button>
                    <button onClick={() => setDisplayCount('top10')} className={displayCount === 'top10' ? 'active' : ''}>Top 10</button>
                    <button onClick={() => setDisplayCount('top100')} className={displayCount === 'top100' ? 'active' : ''}>Top 100</button>
                    <button onClick={() => setDisplayCount('all')} className={displayCount === 'all' ? 'active' : ''}>Show All</button>
                </div>
            </div>
            {data && (
                <div className="chart">
                    <Line data={processChartData(data)} />
                </div>
            )}
        </div>
    );
};

export default TimeBasedOrderTrendByCityChart;