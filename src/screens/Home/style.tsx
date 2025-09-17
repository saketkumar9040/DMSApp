import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../globals/Colors";
import { FontSizes } from "../../globals/FontSizes";

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.bg
    },
    loginContainer: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        gap: 50,
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
    buttonContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    generateOTPButton: {
        flexDirection: "row",
        alignSelf: "center",
        padding: 10,
        paddingHorizontal: 30,
        backgroundColor: Colors.teal,
        marginVertical: 20,
        borderRadius: 50,
        width: width * 0.5,
        alignItems: "center",
        justifyContent: "center"
    },
    searchButton: {
        flexDirection: "row",
        alignSelf: "center",
        padding: 10,
        paddingHorizontal: 30,
        borderWidth: 1,
        borderColor: Colors.teal,
        marginVertical: 20,
        borderRadius: 50,
        width: width * 0.5,
        alignItems: "center",
        justifyContent: "center"
    },
    searchText: {
        fontSize: FontSizes.font20,
        color: Colors.teal,
        fontWeight: "500",
        textAlign: "center"
    },
    docsImage: {
        height: 120,
        width: 120,
    },
    textInput: {
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 10,
        paddingHorizontal: 10,
    },

    // ======================== Modal Style ==============================//
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: Colors.black + 50, // Optional dark background
    },
    modalContainer: {
        backgroundColor: Colors.bg,
        paddingHorizontal: 20,
        // paddingTop: 5,
    },
    closeText: {
        fontSize: FontSizes.font20,
        fontWeight: "700",
        textDecorationLine: "underline",
        color: Colors.teal
    },
    titleHeading: {
        fontSize: FontSizes.font18,
        fontWeight: "500",
        color: Colors.black
    },
    titleTextInput: {
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 5,
        paddingHorizontal: 15,
        padding: 5,
        width: 150,
        elevation: 10,
        backgroundColor: Colors.bg
    },
    dropdown: {
        zIndex: 1,
        borderColor: "#aaa",
    },
    dropdownContainer: {
        borderColor: "#aaa",
    },
    tagTextInput: {
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    item: { paddingVertical: 10, paddingHorizontal: 12 },
    itemText: { color: Colors.black, fontSize: 16 },
    separator: { height: 1, backgroundColor: "#2A2A2A" },
})

export default styles;