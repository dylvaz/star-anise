import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';

const AuthApp = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Header />
        <Home />
      </Route>
    </Switch>
  </Router>
);

export default AuthApp;
