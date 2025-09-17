import type {IAlbum, ITracks} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchAlbum, fetchAlbums, fetchAlbumTracks} from "./albumThunk.ts";

interface AlbumState {
    albums: IAlbum[],
    tracks: ITracks[],
    albumOne: IAlbum | null,
    loading: boolean;
}

const initialState: AlbumState = {
    albums: [],
    tracks: [],
    albumOne: null,
    loading: false,
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
            })
            .addCase(fetchAlbums.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchAlbum.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAlbum.fulfilled, (state, {payload}) => {
                state.albumOne = payload;
            })
            .addCase(fetchAlbum.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchAlbumTracks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAlbumTracks.fulfilled, (state, {payload}) => {
                state.tracks = payload;
            })
            .addCase(fetchAlbumTracks.rejected, (state) => {
                state.loading = false;
            })
    },
    selectors: {
        selectAlbums: (state) => state.albums,
        selectOneAlbum: (state) => state.albumOne,
        selectTracks: (state) => state.tracks,
    }
});

export const albumReducer = albumSlice.reducer;
export const {selectAlbums, selectOneAlbum, selectTracks} = albumSlice.selectors;