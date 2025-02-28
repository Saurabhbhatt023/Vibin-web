import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      // Handle various response formats
      if (action.payload && action.payload.data && Array.isArray(action.payload.data)) {
        return action.payload.data;
      } else if (Array.isArray(action.payload)) {
        return action.payload;
      }
      
      // Fallback: return empty array if we can't determine format
      console.warn("Unexpected feed data format:", action.payload);
      return [];
    },
  },
});

export const { addFeed } = feedSlice.actions;
export default feedSlice.reducer;