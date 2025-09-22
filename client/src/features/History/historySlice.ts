import type {IHistory} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {getSongs} from "./historyThunk.ts";

interface HistoryState {
    tracks: IHistory[],
    loading: boolean,
}

const initialState: HistoryState = {
    tracks: [],
    loading: false,
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSongs.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSongs.fulfilled, (state, {payload}) => {
                state.tracks = payload;
                state.loading = false;
            })
            .addCase(getSongs.rejected, (state) => {
                state.loading = false;
            })
    },
    selectors: {
        selectHistory: (state) => state.tracks,
        selectHistoryLoading: (state) => state.loading
    }

});

export const historyReducer = historySlice.reducer;
export const {
    selectHistory,
    selectHistoryLoading,
} = historySlice.selectors;