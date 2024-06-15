// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <NavLink to="/" className="title">Insights</NavLink>
            <ul>
                <li>
                    <NavLink to="/highest_per_hour_sales_by_city" activeClassName="active">Highest Per Hour Sales By City</NavLink>
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