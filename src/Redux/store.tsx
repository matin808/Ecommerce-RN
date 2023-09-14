import {configureStore} from '@reduxjs/toolkit';
import userSlice from './Users/userSlice';

export const store = configureStore({
  reducer: {
    users: userSlice,
  },
});
