import axios from 'axios';

export const baseURL = "http://127.0.0.1:5001/food-app-d1678/us-central1/app";

export const validateUserIdToken = async (token) => {
    try{
    const response = await axios.get(`${baseURL}/api/users/jwtVerification`, {
        headers: {Authorization : "Bearer " + token}
    });

    return response.data.data;

    }
    catch(err) {
        console.log(err);
        return null;
    }
}