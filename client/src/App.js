import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import LoginPage from './pages/login';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={LoginPage}/>
    </BrowserRouter>
  );
}

export default App;
