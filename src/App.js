// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Insight1 from './pages/Insight1';
import Insight2 from './pages/Insight2';
import Insight3 from './pages/Insight3';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Sidebar />
                <Dashboard>
                    <Routes>
                        <Route path="/insight1" element={<Insight1 />} />
                        <Route path="/insight2" element={<Insight2 />} />
                        <Route path="/insight3" element={<Insight3 />} />
                        <Route path="/" element={<h2>Welcome to the Order Management Dashboard</h2>} />
                    </Routes>
                </Dashboard>
            </div>
        </Router>
    );
}

export default App;