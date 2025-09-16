import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import { Colors } from '../../globals/Colors';
import APIServices from '../../services/APIServices';


const LoginScreen = ({ navigation }: any) => {

    const [otp, set_otp] = useState("");
    const [mobile_number, set_mobile_number] = useState("");
    const [otp_button_pressed, set_otp_button_pressed] = useState(false)

    const generate_otp_handler = async () => {
        try {
            set_otp_button_pressed(true);
            const res: any = await APIServices.generate_otp(mobile_number);
            console.log("Generate OTP response ==========> ", res);
            if (res.code == 200) {
                set_otp("123456")
            } else {
                Alert.alert("Alert", res.data)
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
            const res: any = await APIServices.validate_otp(otp);
            console.log("Generate OTP response ==========> ", res);
            if (res.code == 200) {

            } else {
                Alert.alert("Alert", res.data)
            }
        } catch (error) {
            console.log("Error while generating otp ==========> ", error)
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
                    otp ? (
                        <TextInput
                            placeholder='Enter mobile number'
                            placeholderTextColor={Colors.grey}
                            style={{ borderWidth: 1, borderColor: Colors.grey, borderRadius: 10, paddingHorizontal: 10, }}
                            keyboardType='numeric'
                            value={otp}
                            onChangeText={(e) => set_otp(e)}
                        />
                    ) : (
                        <TextInput
                            placeholder='Enter mobile number'
                            placeholderTextColor={Colors.grey}
                            style={{ borderWidth: 1, borderColor: Colors.grey, borderRadius: 10, paddingHorizontal: 10, }}
                            keyboardType='numeric'
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
                    otp ? validate_otp_handler() : generate_otp_handler()
                }}
            >
                {
                    otp_button_pressed ? (
                        <ActivityIndicator size={22} color={Colors.bg} />
                    ) : (

                        <Text style={styles.generateOTPText}>
                            {
                                otp ? "Validate OTP" : "Generate OTP"
                            }
                        </Text>
                    )

                }
            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen;