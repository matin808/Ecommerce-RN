import axios from 'axios';
import {baseUrl} from '../constants';

export const placeOrder = async (address: string, token: string) => {
  const formData = new FormData();
  formData.append('address', address);
  try {
    const res = await axios.post(`${baseUrl}/order`, formData, {
      headers: {
        access_token: token,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data.status;
  } catch (err) {
    return err;
  }
};
