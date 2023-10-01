import axios from 'axios';
import {baseUrl, getProductsList} from '../constants';

export const fetchProductsUsingId = async (id: number) => {
  console.log('11', id);
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
    return response.data.data;
  } catch (err: any) {
    console.log('fetch product err', err);
    console.log(err);
  }
};
