import type {ITracks} from "../../types";
import {createSlice} from "@reduxjs/toolkit";

interface TrackState {
    tracks: ITracks[],
    isLoading: boolean,
}

const initialState: TrackState = {
    tracks: [],
    isLoading: false,
}

export const trackSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {},
});

export const trackReducer = trackSlice.reducer;