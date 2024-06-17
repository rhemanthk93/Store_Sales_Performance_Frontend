import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ChartDropdown from './components/ChartDropdown';
import ChartDisplay from './components/ChartDisplay';
import './App.css';

const App = () => {
    const [selectedChart, setSelectedChart] = useState('cityPerHourSales');

    return (
        <Router>
            <div className="App">
                <Header />
                <ChartDropdown onSelect={setSelectedChart} />
                <Routes>
                    <Route path="/" element={<ChartDisplay selectedChart={selectedChart} />} />
                    {/* Add more routes as needed */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;