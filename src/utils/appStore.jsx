import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // This helps prevent serialization errors with complex objects
                ignoredActions: ['user/addUser', 'feed/addFeed'],
                ignoredPaths: ['user', 'feed'],
            },
        }),
    // devTools: process.env.NODE_ENV !== 'production',
});

export default appStore;