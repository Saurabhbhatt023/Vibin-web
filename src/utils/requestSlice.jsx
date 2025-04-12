import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequest: (state, action) => action.payload,
        removeRequest: (state, action) => {
            // Check if state is an array before filtering
            if (Array.isArray(state)) {
                // Filter out the request with the matching _id
                return state.filter(req => req._id !== action.payload);
            }
            return state; // Return unchanged if not an array
        },
        clearRequests: () => null
    }
});

export const { addRequest, removeRequest, clearRequests } = requestSlice.actions;
export default requestSlice.reducer;