import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connection",
    initialState: null,
    reducers: {
        addConnections: (state, action) => action.payload,
        // Other existing reducers...
        clearConnections: () => null
    }
});

export const { addConnections, clearConnections } = connectionSlice.actions;
export default connectionSlice.reducer;