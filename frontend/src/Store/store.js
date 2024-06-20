import {configureStore } from "@reduxjs/toolkit";
import authSlice from "./Features/user";
import editemployee from "./Features/editemployee";

const Appstore = configureStore({
    reducer:{
        auth:authSlice,
        edit : editemployee
    }
})

export default Appstore