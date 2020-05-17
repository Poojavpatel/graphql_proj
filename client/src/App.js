import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import LoginPage from './pages/login';
import EventsPage from './pages/events';
import BookingsPage from './pages/bookings';
import MainNavigation from './components/Navbar/MainNavigation';
import LoginContext from './context/login-context';

class App extends Component {
  state = {
    token:null,
    userId:null
  }

  login = (token, userId) => {
    this.setState({ token:token, userId:userId });
  }

  logout = () => {
    this.setState({ token:null, userId:null });
  }

  render(){
    return (
      <BrowserRouter>
        <LoginContext.Provider
          value={{
            token:this.state.token,
            userId:this.state.userId,
            login:this.login,
            logout:this.logout
          }}
        >
          <MainNavigation/>
          <div>
            <Switch>
              {this.state.token && <Redirect from="/" to="/events" exact/>}
              {this.state.token && <Redirect from="/login" to="/events" exact/>}
              {!this.state.token && <Route path="/login" component={LoginPage}/>}
              <Route path="/events" component={EventsPage}/>
              {this.state.token && <Route path="/bookings" component={BookingsPage}/>}
              {!this.state.token && <Redirect to="/login" exact/>}
            </Switch>
          </div>
        </LoginContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
