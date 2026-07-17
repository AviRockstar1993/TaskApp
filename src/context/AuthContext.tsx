import React, { createContext, useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

interface AuthContextType {
  user: any | null;
  initializing: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, initializing: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((u) => {
      setUser(u);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, [initializing]);

  return (
    <AuthContext.Provider value={{ user, initializing }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
