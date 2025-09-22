import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";
import type {GlobalError, IHistory} from "../../types";
import type {RootState} from "../../app/store.ts";

export const playSong = createAsyncThunk<
    void,
    string,
    { rejectValue: GlobalError; state: RootState }
>(
    "history/play",
    async (trackId, { rejectWithValue, getState }) => {
        try {
            const token = getState().users.user?.token;

            await axiosApi.post(
                "/history",
                { track: trackId },
                {
                    headers: {
                        Authorization: token
                    },
                }
            );
        } catch (err) {
            if (isAxiosError(err) && err.response) {
                return rejectWithValue(err.response.data);
            }
            throw err;
        }
    }
);

export const getSongs = createAsyncThunk<
    IHistory[],
    void,
    { rejectValue: GlobalError; state: RootState }
>(
    "history/play",
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().users.user?.token;

            const {data} = await axiosApi.get<IHistory[]>("/history", {
                headers: {
                    Authorization: token
                }
            });
            return data;
        } catch (err) {
            if (isAxiosError(err) && err.response) {
                return rejectWithValue(err.response.data);
            }
            throw err;
        }
    }
);
