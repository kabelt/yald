import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from './components/pages/Profile';
import Registration from './components/pages/Registration';
import Explore from './components/pages/Explore'
import Single from './components/pages/Single'


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/registration' component={Registration} />
          <Route path='/explore' component={Explore} />
          <Route path='/profile' component={Profile} />
          <Route path='/single' component={Single} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
