import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postSlice from './postSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postSlice,
  },
});

export default store;
