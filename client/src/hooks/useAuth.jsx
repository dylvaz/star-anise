import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import { getCurrentUser } from '../api/user';

const AuthContext = createContext({ user: {} });

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const auth = async () => {
      setUser(await getCurrentUser());
    };
    auth();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
