import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

import { LightTheme, DarkTheme } from '../utills/colors';

interface ThemeContextType {
  theme: typeof LightTheme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType,
);

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const deviceTheme = useColorScheme();

  const [isDark, setIsDark] = useState(deviceTheme === 'dark');

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: isDark ? DarkTheme : LightTheme,
        isDark,
        toggleTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);