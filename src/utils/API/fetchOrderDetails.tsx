import axios from 'axios';
import {baseUrl} from '../constants';

export const fetchOrderDetail = async (id: number, token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/orderDetail?order_id=${id}`, {
      headers: {
        access_token: token,
      },
    });

    return res.data;
  } catch (err) {
    console.log('Something Went wrong');
  }
};
