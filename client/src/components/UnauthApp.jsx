import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Header from './Header';
import Home from './Home';
import SignUp from './SignUp';

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
      <Route exact path="/signup">
        <SignUp />
      </Route>
    </Switch>
  </Router>
);

export default UnauthApp;
