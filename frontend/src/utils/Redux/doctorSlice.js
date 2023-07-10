import { createSlice } from "@reduxjs/toolkit";
const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    id: "",
    name: "",
    number: "",
    email: "",
    verified: "",
    experience: "",
    image: "",
    regNumber: "",
    specialization: "",
  },
  reducers: {
    doctorLogin: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.number = action.payload.number;
      state.id = action.payload._id;
      state.verified = action.payload.verified;
    },
   
    doctorApplicationSubmition: (state, action) => {
      state.id = action.payload.id;
      state.verified = action.payload.verified;
      state.experience = action.payload.experience;
      state.image = action.payload.image;
      state.regNumber = action.payload.regNumber;
      state.specialization = action.payload.specialization;
    },
    
  },
  
});



export const { doctorLogin, doctorApplicationSubmition } = doctorSlice.actions;

export default doctorSlice.reducer;
