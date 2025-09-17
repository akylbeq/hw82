import {createAsyncThunk} from "@reduxjs/toolkit";
import type {IArtist} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchArtists = createAsyncThunk<IArtist[], void>('artists/fetching', async () => {
    try {
        const {data} = await axiosApi.get<IArtist[]>('/artists');
        return data
    } catch (e) {
        throw e;
    }
});