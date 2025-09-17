import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/Login';
import HomeScreen from '../screens/Home';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set_token } from '../redux/slices/mainSlice';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const dispatch = useDispatch()

  const token = useSelector((state: any) => state.main.token);

  // useEffect(() => {
  //   fetch_stored_token()
  // }, [])

  // const fetch_stored_token = async () => {
  //   try {
  //     const stored_token: any = await AsyncStorage.getItem("token");
  //     console.log(stored_token);
  //     if (stored_token) {
  //       dispatch(set_token(stored_token))
  //     }
  //   } catch (error) {
  //     console.log("Error while fetching stored token ===========> ", error)
  //   }
  // }

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