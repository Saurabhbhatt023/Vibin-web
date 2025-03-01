import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./ConnectionSlice"; // Use exact casing


const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connection: connectionReducer,  // ✅ Corrected key
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['user/addUser', 'feed/addFeed'],
                ignoredPaths: ['user', 'feed'],
            },
        }),
});

export default appStore;
