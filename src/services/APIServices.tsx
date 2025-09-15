import { URL } from "../globals/Constants"

const generate_otp = async (mobile_number: any) => {
    try {
        let fetchParameter: any = {
            method: 'POST',
            body: JSON.stringify({
                mobile_number
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };
        let serverResponse = await fetch(URL + "/generateOTP", fetchParameter);
        let response = await serverResponse.json();
        return response;
    } catch (error) {
        console.log("Error while generating OTP", error)
    }
};

export default {
    generate_otp
}