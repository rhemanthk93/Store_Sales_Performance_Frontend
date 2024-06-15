// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import HighestPerHourSalesByCity from './pages/HighestPerHourSalesByCity';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/highest_per_hour_sales_by_city" element={<HighestPerHourSalesByCity />} />
                        <Route path="/insight2" element={<h2>Insight 2</h2>} />
                        <Route path="/insight3" element={<h2>Insight 3</h2>} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;