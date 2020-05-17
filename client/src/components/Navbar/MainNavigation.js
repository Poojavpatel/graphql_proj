import React from 'react';
import {NavLink} from 'react-router-dom';
import './MainNavigation.css';
import LoginContext from '../../context/login-context';

const MainNavigation = props => (
  <LoginContext.Consumer>
    {(context) => {
      return(
        <header className="main-navigation">
          <div className="main-navigation__logo">
            <h1>Easy Events</h1>
          </div>
          <nav className="main-navigation__items">
            <ul>
              <li><NavLink to="/events">Events</NavLink></li>
              {context.token && <li><NavLink to="/bookings">Bookings</NavLink></li>}
              {!context.token && <li><NavLink to="/login">Login</NavLink></li>}
              {context.token && <li><button onClick={context.logout}>Logout</button></li>}
            </ul>
          </nav>
        </header>
      )
    }}
  </LoginContext.Consumer>
);

export default MainNavigation;