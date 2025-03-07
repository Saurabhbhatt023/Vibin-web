import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";; 
import requestReducer from "./requestSlice"
const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connection: connectionReducer,
        requests : requestReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['user/addUser', 'feed/addFeed', 'connection/addConnections'],
                ignoredPaths: ['user', 'feed', 'connection'],
            },
        }),
});

export default appStore;