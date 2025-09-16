import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import RootNavigator from "./src/navigations/RootNavigator"
import { Colors } from './src/globals/Colors';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={Colors.teal} />
      <RootNavigator />
    </SafeAreaProvider>
  );
};


export default App;
