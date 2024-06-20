// import { createSlice } from "@reduxjs/toolkit";

// const user = createSlice({
//     name : "User",
//     initialState : null,
//     reducers : {
//         logedInUser :(state , action)=>{
//             return action.payload
//         },
//         logoutUser:()=>{
//             return null;
//         }
//     }

// })

// export const {logedInUser , logoutUser} = user.actions
// export default user.reducer;

import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: Cookies.get('token') || null,
    isAuthenticated: !!Cookies.get('token')
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      Cookies.set('token', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      Cookies.remove('token');
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

