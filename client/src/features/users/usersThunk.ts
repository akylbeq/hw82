import {createAsyncThunk} from "@reduxjs/toolkit";
import type {GlobalError, IUser, UserLogin, UserMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";

export const signup = createAsyncThunk<IUser, UserMutation, {rejectValue: GlobalError}>('users/signup', async (i, {rejectWithValue}) => {
    try {
        const {data} = await axiosApi.post<IUser>('/user', i);
        return data;
    } catch (e) {
        if (isAxiosError(e) && e.response) {
            return rejectWithValue(e.response.data);
        }
        throw e;
    }
});

export const login = createAsyncThunk<IUser, UserLogin, {rejectValue: GlobalError}>('users/login', async (i, {rejectWithValue}) => {
    try {
        const {data} = await axiosApi.post<IUser>('/user/session', i);
        return data;
    } catch (e) {
        if (isAxiosError(e) && e.response) {
            return rejectWithValue(e.response.data);
        }
        throw e;
    }
})