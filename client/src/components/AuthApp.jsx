import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Header from './Header';
import Home from './Home';

const AuthApp = () => {
  const { user } = useAuth();
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default AuthApp;
