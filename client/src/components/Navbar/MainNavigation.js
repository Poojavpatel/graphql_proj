import React from 'react';
import {NavLink} from 'react-router-dom';

import LoginContext from '../../context/login-context';

const MainNavigation = props => (
  <LoginContext.Consumer>
    {(context) => {
      return(
        <header>
          <div>
            <h1>Easy Events</h1>
          </div>
          <nav>
            <ul>
              <li><NavLink to="/events">Events</NavLink></li>
              {context.token && <li><NavLink to="/bookings">Bookings</NavLink></li>}
              {!context.token && <li><NavLink to="/login">Login</NavLink></li>}
            </ul>
          </nav>
        </header>
      )
    }}
  </LoginContext.Consumer>
);

export default MainNavigation;