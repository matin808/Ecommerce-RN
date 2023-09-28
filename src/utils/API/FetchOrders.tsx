import axios from 'axios';
import {baseUrl} from '../constants';

export const fetchOrders = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/orderList`, {
      headers: {
        access_token: token,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(res.data.data);
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (err) {
    return err;
  }
};
