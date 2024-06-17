// src/components/SalesTiersChart.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { getSalesTiers } from '../api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './SalesTiersChart.css';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const SalesTiersChart = () => {
    const [data, setData] = useState(null);
    const [cityData, setCityData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getSalesTiers();
                const parsedData = JSON.parse(result);
                const tierCounts = Object.values(parsedData).reduce((acc, { Tier }) => {
                    acc[Tier] = (acc[Tier] || 0) + 1;
                    return acc;
                }, {});

                const tierCities = Object.entries(parsedData).reduce((acc, [city, { Tier }]) => {
                    acc[Tier] = acc[Tier] || [];
                    acc[Tier].push(city);
                    return acc;
                }, {});

                const chartData = {
                    labels: ['Highest Sales', 'Medium Sales', 'Lowest Sales'],
                    datasets: [
                        {
                            data: [tierCounts[0], tierCounts[1], tierCounts[2]],
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.4)',
                                'rgba(255, 159, 64, 0.4)',
                                'rgba(255, 205, 86, 0.4)'
                            ],
                            borderColor: [
                                'rgba(75, 192, 192, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(255, 205, 86, 1)'
                            ],
                            borderWidth: 1,
                        },
                    ],
                };
                setData(chartData);
                setCityData(tierCities);
            } catch (error) {
                console.error('Error fetching sales tiers:', error);
            }
        };

        fetchData();
    }, []);

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const tier = tooltipItem.label;
                        const cities = cityData[tooltipItem.dataIndex] || [];
                        return [
                            `Cities: ${cities.length}`,
                            ...cities.map(city => `- ${city}`)
                        ];
                    }
                }
            },
            datalabels: {
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((acc, curr) => acc + curr, 0);
                    const percentage = ((value / total) * 100).toFixed(2) + '%';
                    return percentage;
                },
                color: '#fff',
                backgroundColor: (context) => context.dataset.backgroundColor[context.dataIndex],
                borderRadius: 4,
                font: {
                    weight: 'bold'
                },
                padding: 6
            }
        }
    };

    return (
        <div className="chart-container" style={{ width: '50%', margin: '0 auto' }}>
            <h2>City Sales Tiers</h2>
            {data && <Pie data={data} options={options} />}
        </div>
    );
};

export default SalesTiersChart;