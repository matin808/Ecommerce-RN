import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl, register, signin} from '../../utils/constants';
import {IFormState} from '../../Screens/Auth/Register';
import {ILoginForm} from '../../Screens/Auth/Login';
import {IUpdateStateProps} from '../../Screens/UpdateProfile';

/**
 * @author Matin Kadri
 * @param Handling Authentication of users and storing address of the user
 */

export interface SelectedAddress {
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface IAddressProps {
  data: Record<string, SelectedAddress>;
  id: number;
}

export interface User {
  access_token: string;
  country_id: null | number;
  created: string;
  dob: string;
  email: string;
  first_name: string;
  gender: string;
  id: number;
  is_active: boolean;
  last_name: string;
  modified: string;
  phone_no: string;
  profile_pic: string;
  role_id: number;
  username: string;
}

interface IInitialState {
  users: User[];
  address: IAddressProps[];
  success: boolean;
  error: boolean;
  loading: boolean;
  selectedAddress: SelectedAddress | any;
}

interface IState {
  users: {
    users: User[];
    address: [];
    selectedAddress: SelectedAddress;
  };
}

const initialState: IInitialState = {
  users: [],
  address: [],
  success: false,
  error: false,
  loading: false,
  selectedAddress: null,
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

export const updateDetails = createAsyncThunk(
  'users/updateUser',
  async (data: {form: IUpdateStateProps; token: string}, thunkAPI) => {
    const {form, token} = data;
    const formData = new FormData();
    formData.append('first_name', form.first_name);
    formData.append('last_name', form.last_name);
    formData.append('email', form.email);
    formData.append('dob', form.dob);
    formData.append('profile_pic', form.profile_pic);
    formData.append('phone_no', form.phone_no);

    try {
      const res = await axios.post(`${baseUrl}/users/update`, formData, {
        headers: {
          access_token: token,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (err) {
      console.log('Something went wrong', err);
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logoutUser: state => {
      state.users.pop();
      // state.users = [];
    },
    addAddress: (state, action) => {
      console.log('aa', action.payload);
      const addData = {
        id: Math.floor(Math.random() * 1000),
        data: action.payload,
      };
      console.log('myyy', addData);
      state?.address?.push(addData);
      console.log('1122', state.address);
    },
    deleteAddress: (state, action) => {
      state.address = state.address.filter(
        (item: any) => item.id !== action.payload,
      );
    },

    updateAddress: (state, action) => {
      const updatedAddress = action.payload;
      const addressIndex = state.address.findIndex(
        address => address?.id === updatedAddress.id,
      );

      if (addressIndex !== -1) {
        state.address[addressIndex] = updatedAddress;
      }
    },

    selectAddress: (state, action) => {
      // for getting data for selected address
      const main = state.address.find(address => address.id === action.payload);
      state.selectedAddress = main?.data;
    },
  },
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

    builder.addCase(signInUser.pending, (state, action) => {
      console.log('builder sign in', action.payload);
      state.loading = true;
    });

    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.users.push(action.payload.data);
      state.success = true;
      state.loading = false;
    });

    builder.addCase(signInUser.rejected, state => {
      state.success = true;
      state.error = false;
    });

    builder.addCase(updateDetails.fulfilled, (state, action) => {
      state.users.push(action.payload.data);
      state.users.shift();
      state.success = true;
    });
  },
});

export const {
  logoutUser,
  addAddress,
  deleteAddress,
  updateAddress,
  selectAddress,
} = userSlice.actions;

export const getUserData = (state: IState | any) => state?.users.users;
export const userToken = (state: IState | any) =>
  state?.users?.users[0]?.access_token;
export const userAddress = (state: IState | any) => state?.users?.address;
export const usrSelectedAddress = (state: IState | any) =>
  state.users?.selectedAddress;
export default userSlice.reducer;
