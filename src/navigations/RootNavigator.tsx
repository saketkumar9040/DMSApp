import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/Login';
import HomeScreen from '../screens/Home';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {

  const token = useSelector((state: any) => state.main.token);

  return (
    <NavigationContainer >
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {
          token ? <Stack.Screen name="Home" component={HomeScreen} /> : <Stack.Screen name="Login" component={LoginScreen} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator;