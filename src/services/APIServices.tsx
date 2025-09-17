import AsyncStorage from "@react-native-async-storage/async-storage";
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

const validate_otp = async (mobile_number: any, otp: any) => {
    try {
        let fetchParameter: any = {
            method: 'POST',
            body: JSON.stringify({
                mobile_number,
                otp
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };
        let serverResponse = await fetch(URL + "/validateOTP", fetchParameter);
        let response = await serverResponse.json();
        return response;
    } catch (error) {
        console.log("Error while validating OTP", error)
    }
};

const upload_file = async (file: any, major_head: any, minor_head: any, document_date: any, document_remarks: any, selected_tag: any, user_id: any) => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            console.log(file, major_head, minor_head, document_date, document_remarks, selected_tag, user_id)
            const token: any = await AsyncStorage.getItem("token");
            const formData = new FormData();
            formData.append('file', {
                uri: file?.path || file?.uri,
                type: file?.mime || file?.type,
                name: file?.filename || file?.name,
            });
            formData.append('data', { major_head, minor_head, document_date, document_remarks, tags: [{ tag_name: selected_tag }], user_id })
            let fetchParameter: any = {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Accept: 'application/json',
                    'token': `${token}`
                },
            };
            let serverResponse = await fetch(URL + "/saveDocumentEntry", fetchParameter);
            let response = await serverResponse.json();
            resolve(response)
        } catch (error) {
            console.log("Error upload file ------->", error)
            reject(error)
        }
    })
};

const search_document = async (major_head: any, minor_head: any, from_date: any, to_date: any, tags: any, uploaded_by: any, filterId: any, search: any) => {
    try {
        const token: any = await AsyncStorage.getItem("token");
        let fetchParameter: any = {
            method: 'POST',
            body: JSON.stringify({
                major_head,
                minor_head,
                from_date,
                to_date,
                tags,
                uploaded_by,
                start: 0,
                length: 10,
                filterId,
                search
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': `${token}`
            },
        };
        let serverResponse = await fetch(URL + "/searchDocumentEntry", fetchParameter);
        let response = await serverResponse.json();
        return response;
    } catch (error) {
        console.log("Error while search document", error)
    }
};

const document_tags = async (term: any) => {
    try {
        const token: any = await AsyncStorage.getItem("token");
        let fetchParameter: any = {
            method: 'POST',
            body: JSON.stringify({
                term
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': `${token}`
            },
        };
        let serverResponse = await fetch(URL + "documentTags", fetchParameter);
        let response = await serverResponse.json();
        return response;
    } catch (error) {
        console.log("Error while fetching document tags", error)
    }
};

export default {
    generate_otp,
    validate_otp,
    upload_file,
    search_document,
    document_tags
}