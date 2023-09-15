import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  success: false,
  error: false,
};

export const signInUser = createAsyncThunk(
  'users/signInUser',
  async (form: any, thunkAPI) => {
    let bodyFormData = new FormData();
    bodyFormData.append('email', form.email);
    bodyFormData.append('password', form.password);
    console.log('fromm thunk', bodyFormData);

    try {
      const response = await axios.post(
        'http://staging.php-dev.in:8844/trainingapp/api/users/login',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('singin', response.data);
      //
      return response.data;
    } catch (err: any) {
      console.log('singin err', err);
      return thunkAPI.rejectWithValue(err);
      // return err;
    }
  },
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (form: any, thunkAPI) => {
    let bodyFormData = new FormData();
    console.log('userrr', form);
    bodyFormData.append('first_name', form.first_name);
    bodyFormData.append('last_name', form.last_name);
    bodyFormData.append('email', form.email);
    bodyFormData.append('password', form.password);
    bodyFormData.append('confirm_password', form.confirm_password);
    bodyFormData.append('gender', form.gender);
    bodyFormData.append('phone_no', form.phone_no);
    console.log('body', bodyFormData);

    try {
      const response = await axios.post(
        'http://staging.php-dev.in:8844/trainingapp/api/users/register',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('ddd', response.data);
      //

      return response.data;
    } catch (err: any) {
      console.log('myerr', err);
      return thunkAPI.rejectWithValue(err);
      // return err;
    }
  },
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addUser.pending, (state, action) => {
      state.status = 'loading';
      console.log('Loaddding');
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload.data);
      state.success = true;
      console.log('my state', state.users);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = true;
      console.log('build err', state.error);
    });
    //

    builder.addCase(signInUser.fulfilled, (state, action) => {
      console.log('builder sign in', action.payload);
      state.users.push(action.payload.data);
      state.success = true;
    });
  },
});

export const getAllUsers = state => state.users.users;

export default userSlice.reducer;
