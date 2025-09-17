import {createAsyncThunk} from "@reduxjs/toolkit";
import type {IAlbum, ITracks} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchAlbums = createAsyncThunk<IAlbum[], string | undefined>('album/fetching', async (id) => {
   try {
       const query = id ? `/albums/?artist=${id}` : '/albums';
       const { data } = await axiosApi.get<IAlbum[]>(query);
       return data;
   } catch (e) {
       throw e;
   }
});

export const fetchAlbum = createAsyncThunk<IAlbum, string>('album/fetchOne', async (s) => {
    try {
        const {data} = await axiosApi.get<IAlbum>('/albums/' + s)
        return data;
    } catch (e) {
        throw e;
    }
});

export const fetchAlbumTracks = createAsyncThunk<ITracks[], string>('albumTracks/fetching', async (s) => {
    try {
        const {data} = await axiosApi.get<ITracks[]>('/tracks?album=' + s)
        return data;
    } catch (e) {
        throw e;
    }
})