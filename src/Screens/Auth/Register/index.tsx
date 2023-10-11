import {Alert, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../../Container/Custom/Text';
import Input from '../../../Container/Custom/TextInput';
import {colors} from '../../../assets/colors/Colors';
import Button from '../../../Container/Custom/Button';
import {RegisterScreenNavigationProps} from '../../../Navigation/types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RadioBtn from '../../../Container/Custom/RadioButton';
import {addUser} from '../../../Redux/Users/userSlice';
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhoneNo,
} from '../../../utils/Validator';
import {useAppDispatch, useAppSelector} from '../../../Redux/store';

/**
 *
 * @param param0
 * @description Register screen
 * @author Matin Kadri
 * @returns
 */

export interface IFormState {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  gender: string;
  phone_no: number;
}

interface IErrorState {
  first_name: string;
  last_name: string;
  general: string;
  email: string;
  password: string;
  confirm_password: string;
  phone_no: string;
}

const Register = ({navigation}: RegisterScreenNavigationProps) => {
  const [passVisible, setPassVisible] = useState(true);
  const [ConfirmPassVisible, setConfirmPassVisible] = useState(true);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<IFormState>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    gender: '',
    phone_no: 1231231230,
  });

  const [errors, setErrors] = useState<IErrorState>({
    first_name: '',
    last_name: '',
    general: '',
    email: '',
    password: '',
    confirm_password: '',
    phone_no: '',
  });

  const onhandleChange = (field: string, value: any) => {
    if (field === 'first_name') {
      if (!validateName(value)) {
        setErrors({
          ...errors,
          first_name: 'Please enter a valid name',
        });
        return;
      }
    }
    if (field === 'last_name') {
      if (!validateName(value)) {
        setErrors({
          ...errors,
          last_name: 'Please enter a valid name',
        });
        return;
      }
    }
    if (field === 'email') {
      if (!validateEmail(value)) {
        setErrors({...errors, general: '', email: 'Invalid email format'});
        return;
      }
    }
    if (field === 'password') {
      if (!validatePassword(value)) {
        setErrors({
          ...errors,
          password:
            'Password should containe at least 1(capital, small, special character and number)',
        });
        return;
      }
    }

    if (field === 'confirm_password') {
      if (form.password !== value) {
        setErrors({
          ...errors,
          confirm_password: 'Confirm password should match password',
        });
        return;
      } else {
        setErrors({
          ...errors,
          confirm_password: '',
        });
      }

      setForm({...form, confirm_password: value});
    }

    if (field === 'phone_no') {
      if (!validatePhoneNo(value)) {
        setErrors({
          ...errors,
          phone_no: 'Phone number should be 10 number long',
        });
        return;
      }
    }

    setErrors({...errors, [field]: ''});

    setForm({...form, [field]: value});
  };
  const isError = useAppSelector(state => state.users.error);

  const handlePress = async () => {
    if (
      form.first_name === '' ||
      form.last_name === '' ||
      form.email === '' ||
      form.password === '' ||
      form.confirm_password === '' ||
      form.gender === ''
    ) {
      console.log(form);
      Alert.alert('Please fill in all fields');
      return;
    } else {
      try {
        const data = await dispatch(addUser(form)).unwrap();
        if (data.status === 200) {
          navigation.replace('Tabs');
        }
        if (isError) {
          console.log('Something went wrong');
        }
      } catch (err) {
        console.log('rrr', err);
      }
    }
  };

  return (
    <SafeAreaView style={styles.RegisterContainer}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ImageContainer}>
          <Image source={require('../../../assets/images/register.png')} />
        </View>
        <View style={styles.formContainer}>
          <CustomText style={styles.LabelStyle} title="First Name*" />
          <Input
            placeHolder="john"
            style={styles.TextInputContainer}
            handleChange={(value: string) =>
              onhandleChange('first_name', value)
            }
          />
          <Text style={styles.errorText}>{errors.first_name}</Text>

          <CustomText style={styles.LabelStyle} title="Last Name*" />
          <Input
            placeHolder="Kahh"
            style={styles.TextInputContainer}
            handleChange={(value: string) => onhandleChange('last_name', value)}
          />
          <Text style={styles.errorText}>{errors.last_name}</Text>

          <CustomText style={styles.LabelStyle} title="Email*" />
          <Input
            inputMode={'email'}
            placeHolder="john@gmail.com"
            style={styles.TextInputContainer}
            handleChange={(value: string) => onhandleChange('email', value)}
          />
          <Text style={styles.errorText}>
            {errors.email}
            {errors.general}
          </Text>

          <CustomText style={styles.LabelStyle} title="Password*" />
          <Input
            placeHolder="Jon@123"
            style={styles.TextInputContainer}
            secure={passVisible}
            handleChange={(value: string) => onhandleChange('password', value)}
            showIcon={true}
            handleVisible={() => setPassVisible(!passVisible)}
          />

          <Text style={styles.errorText}>
            {errors.password} {errors.general}
          </Text>

          <CustomText style={styles.LabelStyle} title="Confirm Password*" />
          <Input
            placeHolder="Jon@123"
            style={styles.TextInputContainer}
            secure={ConfirmPassVisible}
            handleChange={(value: string) =>
              onhandleChange('confirm_password', value)
            }
            showIcon={true}
            handleVisible={() => setConfirmPassVisible(!ConfirmPassVisible)}
          />
          <Text style={styles.errorText}>
            {errors.confirm_password} {errors.general}
          </Text>

          <CustomText style={styles.LabelStyle} title="Gender*" />

          <RadioBtn
            handleChange={value => onhandleChange('gender', value)}
            data={form.gender}
          />
          <Text style={styles.errorText}>{errors.general}</Text>

          <CustomText style={styles.LabelStyle} title="Phone Number*" />
          <Input
            style={styles.TextInputContainer}
            inputMode={'numeric'}
            placeHolder="1231231230"
            handleChange={(value: number) => onhandleChange('phone_no', value)}
          />
          <Text style={styles.errorText}>
            {errors.phone_no} {errors.general}
          </Text>

          <Button
            handlePress={handlePress}
            title="Register"
            style={styles.ButtonStyle}
          />
          <Text style={styles.signupStyle}>
            Already have an acount?
            <Text
              style={styles.linkStyle}
              onPress={() => navigation.navigate('Login')}>
              {' '}
              Sign in here
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  RegisterContainer: {
    flex: 1,
    paddingVertical: 5,
  },

  ImageContainer: {
    alignSelf: 'center',
    marginTop: 20,
  },

  TextStyle: {
    color: colors.TEXT,
    fontSize: 27,
    fontFamily: 'Roboto-bold',
    marginTop: 13,
    marginLeft: 18,
  },

  TextInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.UIBG,
    marginVertical: 3,
    borderColor: colors.UIBG,
    borderWidth: 2,
    borderRadius: 10,
  },

  formContainer: {
    marginTop: 15,
    marginHorizontal: 20,
  },

  LabelStyle: {
    fontFamily: 'Roboto-light',
    fontSize: 15,
    marginLeft: 5,
  },

  InputStyle: {
    paddingHorizontal: 10,
    borderColor: colors.UIBG,
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 17,
    marginVertical: 7,
    paddingVertical: 5,
    fontFamily: 'Roboto-Regular',
    backgroundColor: colors.UIBG,
  },

  ButtonStyle: {
    backgroundColor: colors.DEFAULT,
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 13,
  },

  signupStyle: {
    alignSelf: 'center',
    marginVertical: 12,
    fontSize: 15,
    color: '#000',
  },
  errorText: {
    color: 'red',
    fontWeight: '500',
    marginLeft: 5,
  },

  linkStyle: {
    color: 'blue',
  },
});

export default Register;
