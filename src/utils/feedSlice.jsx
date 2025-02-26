import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      // Store only the data array from the API response
      return action.payload.data || action.payload;
    },
  },
});

export const { addFeed } = feedSlice.actions;
export default feedSlice.reducer;