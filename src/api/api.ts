import axios, { AxiosResponse, isAxiosError } from "axios";

import type { Products } from "../types/types";

const API_URL = `https://hotel.aotrek.net/api/auth`;

// Define the response data type interface
interface ResponseDataType {
    categories: Products[];
}

// Define the login API
export const loginAPI = async <T = never, R = AxiosResponse<T>> (email: string, password: string): Promise<R> => {
    try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        const response = await axios.post(`${API_URL}/login`, formData);
        return response as R;
    } catch (error) {
        return error as R;
    }
}

// Define the get all products API
export const getAllProductsAPI = async <T = ResponseDataType, R = AxiosResponse<T>> (): Promise<R> => {
    try {
        const response = await axios.get(`${API_URL}/manage`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInformation')!).user.token}`
            }
        });
        return response as R;
    } catch (error) {
        if (isAxiosError(error)) {
            // Remove the user information from the local storage if the status code is 401
            if (error.response?.status === 401) {
                localStorage.removeItem('userInformation');
            }
            return error as R;
        } else {
            // Handle non-Axios errors if necessary
            return error as R;
        }
    }
}
// Define the create products API
export const createProductsAPI = async <T = never, R = AxiosResponse<T>>(name: string, title: string, description: string): Promise<R> => {
    try {
        const response = await axios.post(`${API_URL}/create`, {
            name: name,
            title: title,
            description: description
        }, {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('userInformation')!).user.token}`
            }
        })
        return response as R;
    } catch (error) {
        if (isAxiosError(error)) {
            // Remove the user information from the local storage if the status code is 401
            if (error.response?.status === 401) {
                localStorage.removeItem('userInformation');
            }
            return error as R;
        } else {
            // Handle non-Axios errors if necessary
            return error as R;
        }
    }
};


// Define the update products API
export const updateProductsAPI = async <T = never, R = AxiosResponse<T>>(id: number, name: string, title: string, description: string): Promise<R> => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, {
            name: name,
            title: title,
            description: description
        }, {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('userInformation')!).user.token}`
            }
        })
        return response as R;
    } catch (error) {
        if (isAxiosError(error)) {
            // Remove the user information from the local storage if the status code is 401
            if (error.response?.status === 401) {
                localStorage.removeItem('userInformation');
            }
            return error as R;
        } else {
            // Handle non-Axios errors if necessary
            return error as R;
        }
    }
};


export const deleteProductsAPI = async <T = never, R = AxiosResponse<T>>(id: number): Promise<R> => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`,{
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('userInformation')!).user.token}`
            }
        })
        return response as R;
    } catch (error) {
        if (isAxiosError(error)) {
            // Remove the user information from the local storage if the status code is 401
            if (error.response?.status === 401) {
                localStorage.removeItem('userInformation');
            }
            return error as R;
        } else {
            // Handle non-Axios errors if necessary
            return error as R;
        }
    }
};