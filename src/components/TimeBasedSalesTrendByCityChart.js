import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getTimeBasedSalesTrendByCity } from '../api';
import './ChartDisplay.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TimeBasedSalesTrendByCityChart = () => {
    const [data, setData] = useState(null);
    const [currency, setCurrency] = useState('USD');
    const [displayCount, setDisplayCount] = useState('top100');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const salesData = await getTimeBasedSalesTrendByCity();
                setData(salesData);
            } catch (error) {
                console.error('Error fetching time-based sales trend:', error);
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
        } else if (displayCount === 'top100') {
            return data.slice(0, 100);
        } else {
            return data;
        }
    };

    const processChartData = (data) => {
        if (!data) return {};

        const hours = Array.from({ length: 8 }, (_, i) => i + 5); // [5, 6, 7, ..., 12]
        const cities = [...new Set(filterData(data).map(d => d.city))];

        const datasets = cities.map(city => {
            const cityData = data.filter(d => d.city === city);
            return {
                label: city,
                data: hours.map(hour => {
                    const hourData = cityData.find(d => d.hour === hour);
                    return hourData ? Math.round(currency === 'USD' ? hourData.total_sales_usd : hourData.total_sales_rmb) : 0;
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

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = Math.round(context.raw); // Round to nearest whole number
                        return `${context.dataset.label}: ${value} ${currency}`;
                    }
                }
            }
        },
        scales: {
            x: {
                type: 'category',
                labels: Array.from({ length: 8 }, (_, i) => `${i + 5}:00 - ${i + 6}:00`), // ["5:00 - 6:00", ..., "12:00 - 13:00"]
            },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return Math.round(value); // Ensure y-axis values are rounded
                    }
                }
            }
        }
    };

    return (
        <div className="chart-display">
            <h2>Time-Based Sales Trend</h2>
            <p>
                This line chart displays the sales trend for different cities from 5am to 12pm. Users can toggle between USD and RMB to see the sales in the desired currency.
            </p>
            <div className="controls">
                <div className="currency-toggle">
                    <button onClick={() => setCurrency('USD')} className={currency === 'USD' ? 'active' : ''}>USD</button>
                    <button onClick={() => setCurrency('RMB')} className={currency === 'RMB' ? 'active' : ''}>RMB</button>
                </div>
                <div className="display-count-toggle">
                    <button onClick={() => setDisplayCount('top5')} className={displayCount === 'top5' ? 'active' : ''}>Top 5</button>
                    <button onClick={() => setDisplayCount('top10')} className={displayCount === 'top10' ? 'active' : ''}>Top 10</button>
                    <button onClick={() => setDisplayCount('top100')} className={displayCount === 'top100' ? 'active' : ''}>Top 100</button>
                    <button onClick={() => setDisplayCount('all')} className={displayCount === 'all' ? 'active' : ''}>Show All</button>
                </div>
            </div>
            {data && (
                <div className="chart">
                    <Line data={processChartData(data)} options={options} />
                </div>
            )}
        </div>
    );
};

export default TimeBasedSalesTrendByCityChart;