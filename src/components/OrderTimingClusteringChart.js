import React, { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { getOrderTimingClustering } from '../api';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend, Title } from 'chart.js';
import 'chartjs-plugin-datalabels';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title);

const OrderTimingClusteringChart = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getOrderTimingClustering();

                const clusters = result.reduce((acc, item) => {
                    if (!acc[item.cluster]) {
                        acc[item.cluster] = {
                            label: `Cluster ${item.cluster}: ${item.cluster === 0 ? 'Low Order Hours' : item.cluster === 1 ? 'Medium Order Hours' : 'High Order Hours'}`,
                            data: [],
                            backgroundColor: '',
                            borderColor: '',
                        };
                    }
                    acc[item.cluster].data.push({
                        x: item.order_hour,
                        y: item.order_qty,
                        city: item.city
                    });

                    // Set colors based on the cluster
                    const colors = [
                        'rgba(255, 205, 86, 0.4)',  // Low Order Hours
                        'rgba(255, 159, 64, 0.4)',  // Medium Order Hours
                        'rgba(75, 192, 192, 0.4)'   // High Order Hours
                    ];
                    acc[item.cluster].backgroundColor = colors[item.cluster];
                    acc[item.cluster].borderColor = colors[item.cluster];

                    return acc;
                }, {});

                const chartData = {
                    datasets: Object.values(clusters),
                };

                setData(chartData);
            } catch (error) {
                console.error('Error fetching order timing clustering:', error);
            }
        };

        fetchData();
    }, []);

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const city = context.raw.city;
                        return `City: ${city}, Orders: ${context.raw.y}`;
                    }
                }
            },
            title: {
                display: true,
                text: 'Order Timing Clustering',
            },
            datalabels: {
                display: false
            },
            legend: {
                labels: {
                    generateLabels: (chart) => {
                        const original = ChartJS.defaults.plugins.legend.labels.generateLabels;
                        const labelsOriginal = original.call(this, chart);
                        labelsOriginal.forEach((label) => {
                            if (label.text.includes('Cluster 0')) {
                                label.text = 'Low Order Hours';
                            } else if (label.text.includes('Cluster 1')) {
                                label.text = 'Medium Order Hours';
                            } else if (label.text.includes('Cluster 2')) {
                                label.text = 'High Order Hours';
                            }
                        });
                        return labelsOriginal;
                    }
                }
            }
        },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Order Time (Hour)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Order Quantity'
                }
            }
        }
    };

    return (
        <div className="chart-container" style={{ width: '70%', margin: '0 auto' }}>
            <h2>Order Timing Clustering</h2>
            {data && <Scatter data={data} options={options} />}
        </div>
    );
};

export default OrderTimingClusteringChart;