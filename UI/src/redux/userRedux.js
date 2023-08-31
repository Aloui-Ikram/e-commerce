/*import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
   currentUser : null ,
   isFetching:false,
   error: false ,
  },
  reducers: {
   loginStart:(state)=>{
    state.isFetching=true;
   },
   loginSuccess:(state,action)=>{
    state.isFetching=false;
    state.currentUser =action.payload //api req in file nsmoh api calls
   }, 
   loginFail:(state)=>{
    state.isFetching=false;
    state.error=true;
   },
   updateInfo:(state,action)=>{
    state.currentUser=action.payload
   }
  },
});

export const { loginStart , loginSuccess, loginFail,updateInfo} = userSlice.actions;
export default userSlice.reducer;*/

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
   currentUser : null ,
   //accessToken : null ,
   isFetching:false,
   error: false ,
   orders: [],
  },
  reducers: {
   loginStart:(state)=>{
    state.isFetching=true;
   },
   loginSuccess:(state,action)=>{
    state.isFetching  = false;
    state.error       = false;
    //state.accessToken = false;
    state.currentUser = action.payload; //api req in file nsmoh api calls
    console.log(action.payload.accessToken);
   }, 
   loginFail:(state)=>{
    state.isFetching=false;
    state.error=true;
   },
   updateInfo:(state,action)=>{
    state.currentUser=action.payload
   },
   logout:(state)=>{
    state.currentUser=null;
   },
   getUserOrdersStart: (state) => {
    state.isFetching = true;
  },
  getUserOrdersSuccess: (state, action) => {
    state.isFetching = false;
    state.orders = action.payload;
  },
  getUserOrdersFailure: (state) => {
    state.isFetching = false;
    state.error = true;
  },
  },
});

export const { loginStart , loginSuccess, loginFail, updateInfo,logout,getUserOrdersStart,getUserOrdersSuccess,getUserOrdersFailure} = userSlice.actions;
export default userSlice.reducer;