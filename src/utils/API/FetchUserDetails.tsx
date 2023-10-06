import axios from 'axios';
import {baseUrl} from '../constants';

export const fetchUserDetails = async (token: string) => {
  try {
    const user = await axios.get(`${baseUrl}/users/getUserData`, {
      headers: {
        access_token: token,
      },
    });

    return user.data.data;
  } catch (err) {
    console.log('Profile Fetching Error', err);
  }
};
