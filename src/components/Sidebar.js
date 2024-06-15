// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Insights</h2>
            <ul>
                <li>
                    <NavLink to="/insight1" activeClassName="active">Insight 1</NavLink>
                </li>
                <li>
                    <NavLink to="/insight2" activeClassName="active">Insight 2</NavLink>
                </li>
                <li>
                    <NavLink to="/insight3" activeClassName="active">Insight 3</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;