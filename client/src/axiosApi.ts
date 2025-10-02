import axios from 'axios';
import type {Store} from "@reduxjs/toolkit";
import type {RootState} from "./app/store.ts";

export const imgUrl = 'http://localhost:8001/'
const axiosApi = axios.create({
    baseURL: 'http://localhost:8001',
});

export const addInterceptors = (store: Store<RootState>) => {
    axiosApi.interceptors.request.use((config) => {
        const token = store.getState().users.user?.token;
        const headers = config.headers;
        headers.set('Authorization', token);
        return config;
    });
}

export default axiosApi;