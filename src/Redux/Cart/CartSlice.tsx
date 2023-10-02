import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {baseUrl} from '../../utils/constants';
import axios from 'axios';

interface ICartProps {
  token: string;
  id: number;
  quantity: number;
}

interface IEditCartProps {
  quantity: number;
  id: number;
}

/**
 * @author Matin Kadri
 * @param Props for Cart add and update
 */

type IUpdatedCartProps = {
  data: boolean;
  message: string;
  status: number;
  total_carts: number;
  user_msg: string;
};

export interface ICartDetailsProps {
  cart: {data: any[]} | any;
  updatedCart: IUpdatedCartProps[];
  isProductAdded: boolean;
}

const initialState: ICartDetailsProps = {
  cart: [],
  updatedCart: [],
  isProductAdded: false,
};
let userToken: string;
export const AddToCart = createAsyncThunk(
  'cart/addToCart',
  async (data: ICartProps, thunkAPI) => {
    const {token, id, quantity} = data;
    userToken = token;
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
    userToken = token;
    try {
      const headers = {
        access_token: token,
        'Content-Type': 'multipart/form-data',
      };
      const response = await axios.get(`${baseUrl}/cart`, {
        headers,
      });
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const EditCartItems = createAsyncThunk(
  'cart/editCartItems',
  async (data: IEditCartProps, thunkAPI) => {
    const {quantity, id} = data;
    console.log(id, 'ss111344', quantity, 'erer', userToken);
    try {
      const formData = new FormData();
      formData.append('product_id', id);
      formData.append('quantity', quantity);
      const headers = {
        access_token: userToken,
        'Content-Type': 'multipart/form-data',
      };
      const response = await axios.post(`${baseUrl}/editCart`, formData, {
        headers,
      });
      console.log('updatedcart details', response.data);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCartDetails: (state: any) => {
      return state.cart;
    },
  },
  extraReducers(builder) {
    builder.addCase(AddToCart.fulfilled, state => {
      state.isProductAdded = true;
    });

    builder.addCase(ListcartItems.fulfilled, (state, action) => {
      state.cart = action.payload;
      console.log('cartitemsss.', state.cart);
    });

    builder.addCase(EditCartItems.fulfilled, (state, action) => {
      state.updatedCart = action.payload;
    });
  },
});

export const {fetchCartDetails} = cartSlice.actions;
export default cartSlice.reducer;
