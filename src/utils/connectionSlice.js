import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connection",
    initialState: null,  // Keep this as null as in your original code
    reducers: {
        addConnections: (state, action) => action.payload,
        removeConnections: () => null,
    },
});

export const { addConnections, removeConnections } = connectionSlice.actions;

export default connectionSlice.reducer;