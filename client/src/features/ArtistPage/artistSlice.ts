import type {GlobalError, IArtist} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createArtist, fetchArtists} from "./artistThunk.ts";

interface ArtistState {
    artist: IArtist[];
    loading: boolean;
    error: GlobalError | null;
}

const initialState: ArtistState = {
    artist: [],
    loading: false,
    error: null,
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
            })
            .addCase(createArtist.pending, (state) => {
                state.loading = true;
            })
            .addCase(createArtist.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createArtist.rejected, (state, {payload: error}) => {
                state.loading = false;
                state.error = error || null;
            }),
    selectors: {
        selectArtists: (state) => state.artist,
        selectArtistLoading: (state) => state.loading
    }
});

export const artistReducer = artistSlice.reducer;
export const {selectArtists, selectArtistLoading} = artistSlice.selectors;