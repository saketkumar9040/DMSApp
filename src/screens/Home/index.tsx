import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const HomeScreen = ({ navigation, route }: any) => {

  const store_user_data = useSelector((state: any) => state.main);
  
  console.log("store_user_data", store_user_data);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen