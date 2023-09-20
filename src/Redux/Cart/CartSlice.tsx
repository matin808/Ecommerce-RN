import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {baseUrl} from '../../utils/constants';
import axios from 'axios';

interface ICartProps {
  token: string;
  id: number;
  quantity: number;
}

const initialState = {
  cart: [],
};

export const AddToCart = createAsyncThunk(
  'cart/addToCart',
  async (data: ICartProps, thunkAPI) => {
    const {token, id, quantity} = data;
    try {
      const formData = new FormData();
      formData.append('product_id', id);
      formData.append('quantity', quantity);
      const headers = {
        access_token: token,
        'Content-Type': 'multipart/form-data',
      };
      const response = await axios.post(`${baseUrl}/addToCart`, formData, {
        headers,
      });

      console.log('from ad toccart', response.data);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const ListcartItems = createAsyncThunk(
  'cart/listCartItems',
  async (token: string, thunkAPI) => {
    try {
      const headers = {
        access_token: token,
        'Content-Type': 'multipart/form-data',
      };
      const response = await axios.get(`${baseUrl}/cart`, {
        headers,
      });
      return response.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const EditCartItems = createAsyncThunk(
  'cart/editCartItems',
  async (id, token) => {
    console.log(id, 'ss111344', token);
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(AddToCart.fulfilled, (state, action) => {
      console.log('aaasszz', action.payload);
      // state.cart = action.payload;
    });

    builder.addCase(ListcartItems.fulfilled, (state, action) => {
      state.cart = action.payload;
      console.log('caszzx', action.payload);
    });
  },
});

export default cartSlice.reducer;
