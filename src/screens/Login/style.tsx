import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../globals/Colors";
import { FontSizes } from "../../globals/FontSizes";

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
        backgroundColor: Colors.bg
    },
    loginContainer: {
        marginBottom: 40,
        alignItems: "center",
        justifyContent: "center",
        gap: 50
    },
    loginText: {
        fontSize: FontSizes.font26,
        color: Colors.black,
        fontWeight: "600",
        textAlign: "center"
    },
    textInputContainer: {
        marginHorizontal: 20
    },
    generateOTPText: {
        fontSize: FontSizes.font20,
        color: Colors.bg,
        fontWeight: "500",
        textAlign: "center"
    },
    generateOTPButton: {
        flexDirection: "row",
        alignSelf: "center",
        padding: 10,
        paddingHorizontal: 30,
        backgroundColor: Colors.teal,
        marginVertical: 40,
        borderRadius: 50,
        width: width * 0.5,
        alignItems: "center",
        justifyContent: "center"
    },
    docsImage: {
        height: 120,
        width: 120,
    }
})

export default styles;