import axios from 'axios';
import {baseUrl} from '../constants';

export const fetchUserDetails = async (token: string) => {
  console.log('333', token);
  try {
    const user = await axios.get(`${baseUrl}/users/getUserData`, {
      headers: {
        access_token: token,
      },
    });

    console.log('1121', user.data);
    return user.data.data;
  } catch (err) {
    console.log('Profile Fetching Error', err);
  }
};
