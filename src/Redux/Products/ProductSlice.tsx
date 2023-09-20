import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl, getProductsList} from '../../utils/constants';
import {SingleProduct} from '../../Container/CategoryItems/ProductList';

/**
 * @author Matin Kadri
 * @param Product data slice
 */

interface IProductState {
  products: SingleProduct[];
  loading: boolean;
  success: boolean;
  error: boolean;
}

interface IProductProps {
  products: IProductState;
}

const initialState: IProductState = {
  products: [],
  // similarProducts: [],
  loading: false,
  success: false,
  error: false,
};

export const fetchProductsById = createAsyncThunk(
  'products/fetchProductsById',
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseUrl}/${getProductsList}?product_category_id=${id})`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('productData', response.data);
      return response.data;
    } catch (err: any) {
      console.log('fetch product err', err);
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProductsById.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProductsById.fulfilled, (state, action) => {
      state.products = action.payload.data;
      state.error = false;
      state.loading = false;
      console.log(action.payload);
    });
    builder.addCase(fetchProductsById.rejected, state => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const getProductLists = (state: IProductProps) =>
  state.products.products;

export default productsSlice.reducer;
