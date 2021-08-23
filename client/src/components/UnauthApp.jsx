import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Header from './Header';
import Home from './Home';

const UnauthApp = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Header />
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
    </Switch>
  </Router>
);

export default UnauthApp;
