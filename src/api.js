// src/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const getCityPerHourSales = async () => {
    try {
        const response = await axios.get(`${API_URL}/city_per_hour_sales`);
        return response.data;
    } catch (error) {
        console.error('Error fetching highest per hour sales:', error);
        throw error;
    }
};

export const getCityAvgSalesWithDistrict = async () => {
    try {
        const response = await axios.get(`${API_URL}/city_avg_sales_with_district`);
        return response.data;
    } catch (error) {
        console.error('Error fetching highest average sales by district:', error);
        throw error;
    }
};

export const getTimeBasedSalesTrendByCity = async () => {
    try {
        const response = await axios.get(`${API_URL}/time_based_sales_trend_by_city`);
        return response.data;
    } catch (error) {
        console.error('Error fetching time-based sales trend:', error);
        throw error;
    }
};

export const getTimeBasedOrderTrendByCity = async () => {
    try {
        const response = await axios.get(`${API_URL}/time_based_order_trend_by_city`);
        return response.data;
    } catch (error) {
        console.error('Error fetching time-based order trend:', error);
        throw error;
    }
};