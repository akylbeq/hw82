import type {GlobalError, IUser} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {login, signup} from "./usersThunk.ts";

interface UserState {
    user: IUser | null;
    isAuthenticated: boolean;
    error: GlobalError | null;
}

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
    error: null,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(signup.pending, (state) => {
                state.isAuthenticated = false;
            })
            .addCase(signup.fulfilled, (state, {payload}) => {
                state.user = payload;
                state.isAuthenticated = true;
            })
            .addCase(signup.rejected, (state, {payload: error}) => {
                state.isAuthenticated = false;
                state.error = error || null
            })
            .addCase(login.pending, (state) => {
                state.isAuthenticated = false;
            })
            .addCase(login.fulfilled, (state, {payload}) => {
                state.user = payload;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, {payload: error} ) => {
                state.isAuthenticated = false;
                state.error = error || null
            })
    ,
    selectors: {
        selectUser: (state) => state.user,
        selectError: (state) => state.error,
    }
});

export const usersReducer = usersSlice.reducer;
export const {
    selectUser,
    selectError,
} = usersSlice.selectors;
export const {clearError} = usersSlice.actions;