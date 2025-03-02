import { createSlice } from "@reduxjs/toolkit";

    const requetSlice  = createSlice ({

          name : "requests" ,
          initialState : null,
          reducers :{
            addRequest :(state , action) => action.payload,

          }
    })

    export const {addRequest}  = requetSlice.actions;
    export default requetSlice.reducer;
    