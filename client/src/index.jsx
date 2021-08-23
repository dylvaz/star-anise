import '@fontsource/roboto';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { AuthProvider } from './hooks/useAuth';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.querySelector('#root'),
);
