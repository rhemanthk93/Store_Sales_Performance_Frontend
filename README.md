# Store Sales Performance Frontend

This project is the frontend part of the Store Sales Performance application, built with React. It provides various visualizations and insights into store sales data.

## Prerequisites

- Node.js (>=14.0.0)
- npm (>=6.0.0) or yarn (>=1.0.0)

## Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd store_sales_performance_frontend
   npm install
   npm start

The application should now be running on http://localhost:3000.

Project Structure

	•	src/components: Contains the React components used in the application.
	•	ChartDisplay.js, ChartDisplay.css: Main chart display component.
	•	ChartDropdown.js, ChartDropdown.css: Dropdown component to select different charts.
	•	CityAvgSalesWithDistrictChart.js: Chart showing average sales by city with district information.
	•	CityPerHourSalesChart.js: Chart showing average per hour sales by city.
	•	Header.js, Header.css: Header component.
	•	OrdersByRegionChart.js: Chart showing orders by region.
	•	OrderTimingClusteringChart.js: Chart showing order timing clusters.
	•	SalesTiersChart.js, SalesTiersChart.css: Chart showing sales tiers by city.
	•	TimeBasedOrderTrendByCityChart.js: Chart showing time-based order trends by city.
	•	TimeBasedSalesTrendByCityChart.js: Chart showing time-based sales trends by city.
	•	src/api: Contains the API calls to the backend.
	•	src/css: Contains the CSS files for styling components.
	•	public: Contains the public assets of the application, including the index.html.

 Dependencies

	•	react
	•	react-dom
	•	react-scripts
	•	chart.js
	•	react-chartjs-2
	•	chartjs-plugin-datalabels
	•	axios

API Endpoints

The frontend communicates with the backend using the following endpoints:

	•	/city_per_hour_sales: Fetches highest per hour sales by city.
	•	/city_avg_sales_with_district: Fetches average sales by city with district information.
	•	/time_based_sales_trend_by_city: Fetches time-based sales trends by city.
	•	/time_based_order_trend_by_city: Fetches time-based order trends by city.
	•	/orders_by_region: Fetches orders by region.
	•	/sales_tiers: Fetches sales tiers by city.
	•	/order_timing_tiers: Fetches order timing clusters.
	•	/orders_by_city_currency: Fetches orders by city and currency.

Charts and Visualizations

The frontend provides several charts and visualizations, including:

	•	City With Average Per Hour Sales: Displays the cities with the average hourly sales from 5am to 12pm. The data is presented in both USD and RMB.
	•	City With Average Sales: Displays the cities with the average sales across all the orders. Hover over or click on the bars to see the districts associated with each city.
	•	Time-Based Sales Trend By City: Displays the sales trend for different cities from 5am to 12pm.
	•	Time-Based Order Trend by City: Displays the order trend for different cities from 5am to 12pm.
	•	Orders by Region: Displays the number of orders by region.
	•	City Sales Tiers: Displays the sales tiers by city.
	•	Order Timing Clusters: Displays the clusters of order timings.

Usage

Users can interact with these charts to gain insights into the store sales performance. The controls allow switching between different currencies (USD and RMB) and filtering the number of top-performing cities.

 
