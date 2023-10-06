import axios from 'axios';
import {baseUrl} from '../constants';

export const forgetPassword = async (email: string) => {
  try {
    const formData = new FormData();
    formData.append('email', email);
    const res = await axios.post(`${baseUrl}/users/forgot`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data?.status;
  } catch (err: any) {
    console.log(err.message);
  }
};
