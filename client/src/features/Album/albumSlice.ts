import type {GlobalError, IAlbum, ITracks} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createAlbum, fetchAlbum, fetchAlbums, fetchAlbumTracks} from "./albumThunk.ts";

interface AlbumState {
    albums: IAlbum[],
    tracks: ITracks[],
    albumOne: IAlbum | null,
    loading: boolean;
    error: GlobalError | null;
}

const initialState: AlbumState = {
    albums: [],
    tracks: [],
    albumOne: null,
    loading: false,
    error: null,
}

export const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAlbums.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAlbums.fulfilled, (state, {payload}) => {
                state.albums = payload;
                state.loading = false;
            })
            .addCase(fetchAlbums.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchAlbum.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAlbum.fulfilled, (state, {payload}) => {
                state.albumOne = payload;
                state.loading = false;
            })
            .addCase(fetchAlbum.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchAlbumTracks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAlbumTracks.fulfilled, (state, {payload}) => {
                state.tracks = payload;
                state.loading = false;
            })
            .addCase(fetchAlbumTracks.rejected, (state) => {
                state.loading = false;
            })
            .addCase(createAlbum.pending, (state) => {
                state.loading = true;
            })
            .addCase(createAlbum.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createAlbum.rejected, (state, {payload: error}) => {
                state.error = error || null;
                state.loading = false;
            })
    },
    selectors: {
        selectAlbums: (state) => state.albums,
        selectOneAlbum: (state) => state.albumOne,
        selectTracks: (state) => state.tracks,
        selectAlbumLoading: (state) => state.loading,
    }
});

export const albumReducer = albumSlice.reducer;
export const {selectAlbums, selectAlbumLoading, selectTracks} = albumSlice.selectors;