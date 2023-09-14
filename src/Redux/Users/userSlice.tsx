import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [
    {
      id: 1,
      username: 'sss',
    },
  ],
};

export const addUser = createAsyncThunk('users/addUser', async (form: any) => {
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
    return response.data;
  } catch (err: any) {
    return err.message;
  }
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload.data);
      console.log('my state', state.users);
    });
  },
});

export const getAllUsers = state => state.users.users;

export default userSlice.reducer;
