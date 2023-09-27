import axios from 'axios';
import {baseUrl} from '../constants';

export const updateDetails = async (form, token) => {
  console.log(`updateDetails`, form, token);
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
    console.log('`````', res.data);
  } catch (err) {
    console.log('Something went wrong', err);
  }
};
