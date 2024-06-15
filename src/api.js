// src/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const getHighestPerHourSales = async () => {
    try {
        const response = await axios.get(`${API_URL}/highest_per_hour_sales_by_city`);
        return response.data;
    } catch (error) {
        console.error('Error fetching highest per hour sales:', error);
        throw error;
    }
};

export const getHighestAvgSales = async () => {
    try {
        const response = await axios.get(`${API_URL}/highest_avg_sales_by_city`);
        return response.data;
    } catch (error) {
        console.error('Error fetching highest average sales:', error);
        throw error;
    }
};

// Add more API calls as needed