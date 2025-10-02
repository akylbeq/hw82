import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {artistReducer} from "../features/ArtistPage/artistSlice.ts";
import {albumReducer} from "../features/Album/albumSlice.ts";
import {usersReducer} from "../features/users/usersSlice.ts";
import {historyReducer} from "../features/History/historySlice.ts";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import {trackReducer} from "../features/track/trackSlice.ts";

const userPersistConfig = {
    key: 'shop:users',
    storage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    artist: artistReducer,
    album: albumReducer,
    users: persistReducer(userPersistConfig, usersReducer),
    history: historyReducer,
    track: trackReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        });
    },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;