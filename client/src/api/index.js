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
};

//add new product
export const addNewProduct = async (data) => {
    try{
        const res = await axios.post(`${baseURL}/api/products/create`, {...data});
        return res.data.data;
    }
    catch(err){
        return err;
    }
};

//get all the products
export const getAllProducts = async () => {
    try{
        const res = await axios.get(`${baseURL}/api/products/all`);
        return res.data.data;
    }
    catch(err) {
        return null;
    }
};

// delete a product
export const deleteAProduct = async (productId) => {
    try{
        const res = await axios.delete(`${baseURL}/api/products/delete/${productId}`);
        return res.data.data;
    }
    catch(err) { 
        return null;
    }
}