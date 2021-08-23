import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AuthApp from './AuthApp';
import UnauthApp from './UnauthApp';

const App = () => {
  const { user } = useAuth();
  return user ? <AuthApp /> : <UnauthApp />;
};

export default App;
