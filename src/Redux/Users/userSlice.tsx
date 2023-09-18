import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl, register, signin} from '../../utils/constants';
import {IFormState} from '../../Screens/Auth/Register';
import {ILoginForm} from '../../Screens/Auth/Login';

/**
 * @author Matin Kadri
 * @param Handling Authentication of users
 */

interface IInitialState {
  users: any[];
  success: boolean;
  error: boolean;
  loading: boolean;
}

interface IState {
  users: {
    users?: any[];
  };
}

const initialState: IInitialState = {
  users: [],
  success: false,
  error: false,
  loading: false,
};

export const signInUser = createAsyncThunk(
  'users/signInUser',
  async (form: ILoginForm, thunkAPI) => {
    let bodyFormData = new FormData();
    bodyFormData.append('email', form.email);
    bodyFormData.append('password', form.password);
    console.log('fromm thunk', bodyFormData);

    try {
      const response = await axios.post(`${baseUrl}/${signin}`, bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('singin', response.data);
      return response.data;
    } catch (err: any) {
      console.log('singin err', err);
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (form: IFormState, thunkAPI) => {
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
        `${baseUrl}/${register}`,
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
      console.log('myerr', err);
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addUser.pending, state => {
      state.loading = true;
      console.log('Loaddding');
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload.data);
      state.success = true;
      state.loading = false;
      console.log('my state', state.users);
    });
    builder.addCase(addUser.rejected, state => {
      state.loading = false;
      state.error = true;
      console.log('build err', state.error);
    });

    /**
     * @author Matin Kadri
     * @param Handling Sign IN user state
     */

    builder.addCase(signInUser.pending, (state, action) => {
      console.log('builder sign in', action.payload);
      state.loading = true;
    });

    builder.addCase(signInUser.fulfilled, (state, action) => {
      console.log('builder sign in', action.payload);
      state.users.push(action.payload.data);
      state.success = true;
      state.loading = false;
    });

    builder.addCase(signInUser.rejected, (state, action) => {
      console.log('builder sign in', action.payload);
      state.success = true;
      state.error = true;
    });
  },
});

export const getAllUsers = (state: IState) => state.users.users;

export default userSlice.reducer;
