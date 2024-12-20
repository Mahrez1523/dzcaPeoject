import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    userData: null,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    clearUser: (state) => {
      state.userId = null;
      state.userData = null;
    },  
   
  },
});

export const { setUserId, setUserData, clearUser } = userSlice.actions;
export default userSlice.reducer;
