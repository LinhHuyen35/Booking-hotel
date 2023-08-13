import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isUserLogin: false,
};
//define slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isUserLogin = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isUserLogin = false;
      state.user = {};
    },
  },
});

export const { logout, login } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state) => state.user.user;
export const isUserLogin = (state) => state.user.isUserLogin;
