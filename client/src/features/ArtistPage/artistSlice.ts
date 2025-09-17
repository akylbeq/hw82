import type {IArtist} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchArtists} from "./artistThunk.ts";

interface ArtistState {
    artist: IArtist[];
    loading: boolean;
}

const initialState: ArtistState = {
    artist: [],
    loading: false,
}

export const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(fetchArtists.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchArtists.fulfilled, (state, {payload}) => {
                state.artist = payload
                state.loading = false;
            })
            .addCase(fetchArtists.rejected, (state) => {
                state.loading = false;
            }),
    selectors: {
        selectArtists: (state) => state.artist,
    }
});

export const artistReducer = artistSlice.reducer;
export const {selectArtists} = artistSlice.selectors;