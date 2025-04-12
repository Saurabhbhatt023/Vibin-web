import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => action.payload,
        removeUserFromFeed: (state, action) => {
            if (Array.isArray(state)) {
                // Filter out posts from the specified user
                return state.filter(post => post.userId !== action.payload);
            }
            return state; // Return unchanged if not an array
        },
        clearFeed: () => null
    }
});

export const { addFeed, removeUserFromFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;