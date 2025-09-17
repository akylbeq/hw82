import axios from 'axios';

export const imgUrl = 'http://localhost:8001/'
const axiosApi = axios.create({
    baseURL: 'http://localhost:8001',
});

export default axiosApi;