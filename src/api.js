// src/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const getHighestPerHourSalesByCity = async () => {
    try {
        const response = await axios.get(`${API_URL}/highest_per_hour_sales_by_city`);
        return response.data;
    } catch (error) {
        console.error('Error fetching highest per hour sales:', error);
        throw error;
    }
};

export const getHighestAvgSalesByDistrict = async () => {
    try {
        const response = await axios.get(`${API_URL}/city_highest_avg_sales_by_district`);
        return response.data;
    } catch (error) {
        console.error('Error fetching highest average sales by district:', error);
        throw error;
    }
};

// Add more API calls as needed