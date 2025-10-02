import {createAsyncThunk} from "@reduxjs/toolkit";
import type {ArtistMutation, GlobalError, IArtist} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";

export const fetchArtists = createAsyncThunk<IArtist[], void, {rejectValue: GlobalError}>('artists/fetching', async (_, {rejectWithValue}) => {
    try {
        const {data} = await axiosApi.get<IArtist[]>('/artists');
        return data
    } catch (e) {
        if (isAxiosError(e) && e.response) {
            return rejectWithValue(e.response.data);
        }
        throw e;
    }
});

export const createArtist = createAsyncThunk<void, ArtistMutation, {rejectValue: GlobalError}>('artists/creating', async (a, {rejectWithValue}) => {
    try {
        const formData = new FormData();
        formData.append("name", a.name);
        formData.append("description", a.description);
        if (a.image) {
            formData.append("image", a.image);
        }
        await axiosApi.post('/artists', formData);
    } catch (e) {
        if (isAxiosError(e) && e.response?.data) {
            return rejectWithValue(e.response.data);
        }
        throw e;
    }
});

export const publishArtistThunk = createAsyncThunk<void, string, {rejectValue: GlobalError}>('artist/publish', async (a, {rejectWithValue}) => {
    try {
        await axiosApi.patch(`/artists/${a}/togglePublished`);
    } catch (e) {
        if (isAxiosError(e) && e.response?.data) {
            return rejectWithValue(e.response.data);
        }
        throw e;
    }
});

export const deleteArtistThunk = createAsyncThunk<void, string>('artist/deleting', async (s) => {
    await axiosApi.delete(`/artists/${s}`);
})