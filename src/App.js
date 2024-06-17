import React, { useState } from 'react';
import Header from './components/Header';
import ChartDropdown from './components/ChartDropdown';
import ChartDisplay from './components/ChartDisplay';
import './App.css';

const App = () => {
    const [selectedChart, setSelectedChart] = useState('');

    return (
        <div className="App">
            <Header />
            <ChartDropdown onSelect={setSelectedChart} />
            <ChartDisplay selectedChart={selectedChart} />
        </div>
    );
};

export default App;