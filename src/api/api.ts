import axios, { AxiosResponse } from "axios";

const API_URL = `https://hotel.aotrek.net/api/auth`;

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

interface Products {
    id: number;
    name: string;
    title: string;
    description: string;
}

interface ResponseDataType {
    categories: Products[];
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
        return error as R;
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
    } catch (err) {
        return err as R;
    }
};
