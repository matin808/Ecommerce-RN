import axios from 'axios';
import {baseUrl} from '../constants';

export const handleRatingFunctionality = async (rating: number, id: number) => {
  console.log('handleRatingFunctionality', rating, id);
  const formData = new FormData();
  formData.append('product_id', id);
  formData.append('rating', rating);
  try {
    const res = await axios.post(`${baseUrl}/products/setRating`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (err) {
    console.log('Rating error', err);
    return err;
  }
};
