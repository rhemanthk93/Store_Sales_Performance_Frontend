import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getCityAvgSalesWithDistrict } from '../api';
import 'chartjs-plugin-datalabels';
import './ChartDisplay.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CityAvgSalesWithDistrictChart = () => {
    const [data, setData] = useState(null);
    const [currency, setCurrency] = useState('USD');
    const [displayCount, setDisplayCount] = useState('top10');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const salesData = await getCityAvgSalesWithDistrict();
                setData(salesData);
            } catch (error) {
                console.error('Error fetching average sales with district data:', error);
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
                label: `Average Sales (${currency})`,
                data: filterData(data).map(d => currency === 'USD' ? Math.round(d.avg_sales_usd) : Math.round(d.avg_sales_rmb)),
                backgroundColor: currency === 'USD' ? 'rgba(75,192,192,0.4)' : 'rgba(255,99,132,0.4)',
                borderColor: currency === 'USD' ? 'rgba(75,192,192,1)' : 'rgba(255,99,132,1)',
                borderWidth: 1,
            }
        ],
    } : {};

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const dataIndex = context.dataIndex;
                        const districts = data[dataIndex].districts.join(', ');
                        const value = Math.round(context.raw); // Round to nearest whole number
                        return `${context.label}: ${value} ${currency}\nDistricts: ${districts}`;
                    }
                }
            },
            datalabels: {
                display: true,
                formatter: function (value) {
                    return Math.round(value); // Round to nearest whole number
                },
                anchor: 'end',
                align: 'top',
            }
        },
        scales: {
            x: {
                type: 'category',
                labels: filterData(data).map(d => d.city),
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
            <h2>City With Average Sales</h2>
            <p>
                This graph displays the cities with the average sales across all the orders. The data is presented in both USD and RMB. Hover over or click on the bars to see the districts associated with each city.
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
                    <Bar data={chartData} options={options} />
                </div>
            )}
        </div>
    );
};

export default CityAvgSalesWithDistrictChart;