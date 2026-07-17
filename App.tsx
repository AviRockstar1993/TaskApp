import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ParentNavigator from './src/auth/ParentNavigator';
import { ThemeProvider } from './src/context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './src/store';

const App = () => {

//  useEffect(() => {
//     initializeNotification();
//   }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Provider store={store}>

          <ParentNavigator />

        </Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
