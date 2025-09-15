import { View, Text } from 'react-native'
import React, { useState } from 'react'
import styles from './style'

const LoginScreen = ({ navigation }: any) => {

    const [otp, set_otp] = useState("");
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.loginText}>Login</Text>
        </View>
    )
}

export default LoginScreen;