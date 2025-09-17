import {configureStore} from "@reduxjs/toolkit";
import {artistReducer} from "../features/ArtistPage/artistSlice.ts";
import {albumReducer} from "../features/Album/albumSlice.ts";

export const store = configureStore({
    reducer: {
        artist: artistReducer,
        album: albumReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;