import {createAsyncThunk} from "@reduxjs/toolkit";
import type {AlbumMutation, GlobalError, IAlbum, ITracks} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";

export const fetchAlbums = createAsyncThunk<IAlbum[], string | undefined, {rejectValue: GlobalError}>('album/fetching', async (id, {rejectWithValue}) => {
   try {
       const query = id ? `/albums/?artist=${id}` : '/albums';
       const { data } = await axiosApi.get<IAlbum[]>(query);
       return data;
   } catch (e) {
       if (isAxiosError(e) && e.response) {
           return rejectWithValue(e.response.data);
       }
       throw e;
   }
});

export const fetchAlbum = createAsyncThunk<IAlbum, string, {rejectValue: GlobalError}>('album/fetchOne', async (s, {rejectWithValue}) => {
    try {
        const {data} = await axiosApi.get<IAlbum>('/albums/' + s)
        return data;
    } catch (e) {
        if (isAxiosError(e) && e.response) {
            return rejectWithValue(e.response.data);
        }
        throw e;    }
});

export const fetchAlbumTracks = createAsyncThunk<ITracks[], string, {rejectValue: GlobalError}>('albumTracks/fetching', async (s, {rejectWithValue}) => {
    try {
        const {data} = await axiosApi.get<ITracks[]>('/tracks?album=' + s)
        return data;
    } catch (e) {
        if (isAxiosError(e) && e.response) {
            return rejectWithValue(e.response.data);
        }
        throw e;
    }
});

export const createAlbum = createAsyncThunk<void, AlbumMutation, {rejectValue: GlobalError}>('album/creating', async (a, {rejectWithValue}) => {
    try {
        const formData = new FormData();
        formData.append("artist", a.artist);
        formData.append("name", a.name);
        formData.append("releaseDate", a.releaseDate);
        if (a.image) {
            formData.append("image", a.image);
        }
        await axiosApi.post('/albums', formData);
    } catch (e) {
        if (isAxiosError(e) && e.response?.data) {
            return rejectWithValue(e.response.data);
        }
        throw e;
    }
});

export const publishAlbum = createAsyncThunk<void, string, {rejectValue: GlobalError}>('album/publish', async (a, {rejectWithValue}) => {
    try {
        await axiosApi.patch(`/albums/${a}/togglePublished`);
    } catch (e) {
        if (isAxiosError(e) && e.response?.data) {
            return rejectWithValue(e.response.data);
        }
        throw e;
    }
});

export const deleteAlbum = createAsyncThunk<void, string>('album/deleting', async (s) => {
    await axiosApi.delete(`/albums/${s}`);
})