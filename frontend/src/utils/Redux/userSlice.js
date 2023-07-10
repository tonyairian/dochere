import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    number: "",
    blocked: "",
    profileImg: "",
    id: "",
  },
  reducers: {
    userLogin: (state, action) => {
      // console.log(action.payload);
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.number = action.payload.number;
      state.blocked = action.payload.blocked;
      state.id = action.payload.id;
      state.profileImg = action.payload.profilePicture;
    },
    updateUserImage: (state, action) => {
      state.profileImg = action.payload;
    },
  },
});
export const { userLogin, updateUserImage } = userSlice.actions;

export default userSlice.reducer;
