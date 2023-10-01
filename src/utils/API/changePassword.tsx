import axios from 'axios';
import {baseUrl} from '../constants';
import {IForm} from '../../Screens/Auth/ChangePassword';

export const handleChangePassword = async (form: IForm, token: string) => {
  const formData = new FormData();
  formData.append('old_password', form.old_password);
  formData.append('password', form.password);
  formData.append('confirm_password', form.confirm_password);
  try {
    const res = await axios.post(`${baseUrl}/users/change`, formData, {
      headers: {
        access_token: token,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('pass changed', res.data);
  } catch (err) {
    console.log('Something went wrong');
  }
};
