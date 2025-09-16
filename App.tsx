import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import RootNavigator from "./src/navigations/RootNavigator"
import { Colors } from './src/globals/Colors';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/store';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={Colors.teal} />
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </SafeAreaProvider>
  );
};


export default App;
