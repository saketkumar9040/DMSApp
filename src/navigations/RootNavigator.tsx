import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/Login';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
      <NavigationContainer >
      <Stack.Navigator 
      screenOptions={{
        headerShown:false
      }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator;