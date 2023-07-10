import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Redux/userSlice";
import adminSlice from "./adminSlice.js";
import doctorSlice from "../Redux/doctorSlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    // admin: adminSlice, 
    doctor: doctorSlice,
  },
});
export default store;
