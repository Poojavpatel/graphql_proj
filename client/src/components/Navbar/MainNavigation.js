import React from 'react';
import {NavLink} from 'react-router-dom';

const MainNavigation = props => (
  <header>
    <div>
      <h1>Easy Events</h1>
    </div>
    <nav>
      <ul>
        <li><NavLink to="/events">Events</NavLink></li>
        <li><NavLink to="/bookings">Bookings</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
      </ul>
    </nav>
  </header>
);

export default MainNavigation;