import React from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import LoginPage from './pages/login';
import EventsPage from './pages/events';
import BookingsPage from './pages/bookings';
import MainNavigation from './components/Navbar/MainNavigation';

function App() {
  return (
    <BrowserRouter>
      <MainNavigation/>
      <div>
        <Switch>
            <Redirect from="/" to="/login" exact/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/events" component={EventsPage}/>
            <Route path="/bookings" component={BookingsPage}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
