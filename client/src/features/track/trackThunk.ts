import {createAsyncThunk} from "@reduxjs/toolkit";
import {isAxiosError} from "axios";
import type {GlobalError, TrackMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const createTrack = createAsyncThunk<void, TrackMutation, {rejectValue: GlobalError}>('track/creating', async (track, {rejectWithValue}) => {
    try {
        await axiosApi.post('/tracks', track);
    } catch (e) {
        if (isAxiosError(e) && e.response) {
            return rejectWithValue(e.response.data);
        }
        throw e;
    }
});

export const publishTrackThunk = createAsyncThunk<void, string, {rejectValue: GlobalError}>('track/publish', async (a, {rejectWithValue}) => {
    try {
        await axiosApi.patch(`/tracks/${a}/togglePublished`);
    } catch (e) {
        if (isAxiosError(e) && e.response?.data) {
            return rejectWithValue(e.response.data);
        }
        throw e;
    }
});

export const deleteTrackThunk = createAsyncThunk<void, string>('track/deleting', async (s) => {
    await axiosApi.delete(`/tracks/${s}`);
})