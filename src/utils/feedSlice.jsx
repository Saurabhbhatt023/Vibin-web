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
    removeUserFromFeed: (state, action) => {
      // If state is not an array, return it as is
      if (!Array.isArray(state)) return state;
      
      // Filter out the user with the matching _id
      const userId = action.payload;
      console.log("Removing user from feed with ID:", userId);
      
      return state.filter(user => user._id !== userId);
    }
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;