import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './style';
import { Colors } from '../../globals/Colors';
import APIServices from '../../services/APIServices';
import { set_user_data } from '../../redux/slices/mainSlice';

const LoginScreen = ({ navigation }: any) => {

    const dispatch = useDispatch()

    const [otp, set_otp] = useState("");
    const [mobile_number, set_mobile_number] = useState("");
    const [is_otp_sent, set_is_otp_sent] = useState(false);
    const [otp_button_pressed, set_otp_button_pressed] = useState(false)

    const generate_otp_handler = async () => {
        try {
            set_otp_button_pressed(true);
            const res: any = await APIServices.generate_otp(mobile_number);
            console.log("Generate OTP response ==========> ", res);
            if (res.status == true) {
                set_is_otp_sent(true)
                return;
            } else {
                return Alert.alert("Alert", res.data)
            }
        } catch (error) {
            console.log("Error while generating otp ==========> ", error)
        } finally {
            set_otp_button_pressed(false)
        }
    };

    const validate_otp_handler = async () => {
        try {
            set_otp_button_pressed(true);
            const res: any = await APIServices.validate_otp(mobile_number, otp);
            console.log("validate OTP response ==========> ", res);
            if (res.status == true) {
                const store_token = await AsyncStorage.setItem("token", res.data.token)
                dispatch(set_user_data(res.data))
            } else {
                Alert.alert("Alert", res.data)
            }
        } catch (error) {
            console.log("Error while validating otp ==========> ", error)
        } finally {
            set_otp_button_pressed(false)
        }
    };



    return (
        <View style={styles.mainContainer}>
            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Login</Text>
                <Image
                    source={require("../../assets/images/docs.png")}
                    style={styles.docsImage}
                    resizeMode='cover'
                />
            </View>
            <View style={styles.textInputContainer}>
                {
                    is_otp_sent ? (
                        <TextInput
                            placeholder='Enter OTP'
                            placeholderTextColor={Colors.grey}
                            style={styles.textInput}
                            keyboardType='numeric'
                            maxLength={6}
                            value={otp}
                            onChangeText={(e) => set_otp(e)}
                        />
                    ) : (
                        <TextInput
                            placeholder='Enter mobile number'
                            placeholderTextColor={Colors.grey}
                            style={styles.textInput}
                            keyboardType='numeric'
                            maxLength={10}
                            value={mobile_number}
                            onChangeText={(e) => set_mobile_number(e)}
                        />
                    )
                }
            </View>
            <TouchableOpacity
                style={styles.generateOTPButton}
                activeOpacity={0.7}
                disabled={otp_button_pressed}
                onPress={() => {
                    is_otp_sent ? validate_otp_handler() : generate_otp_handler()
                }}
            >
                {
                    otp_button_pressed ? (
                        <ActivityIndicator size={22} color={Colors.bg} />
                    ) : (

                        <Text style={styles.generateOTPText}>
                            {
                                is_otp_sent ? "Validate OTP" : "Generate OTP"
                            }
                        </Text>
                    )

                }
            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen;