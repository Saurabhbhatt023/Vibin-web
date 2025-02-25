import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // This helps prevent serialization errors with complex objects
                ignoredActions: ['user/addUser'],
                ignoredPaths: ['user'],
            },
        }),
    // devTools: process.env.NODE_ENV !== 'production',
});

export default appStore;