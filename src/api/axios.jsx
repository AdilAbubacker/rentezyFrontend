import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'http://rentezy.com',
    baseURL: 'http://127.0.0.1:8001',
    withCredentials: true,
});

export default axiosInstance;