import {Alert, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../../../Container/Custom/Text';
import Input from '../../../Container/Custom/TextInput';
import {colors} from '../../../assets/colors/Colors';
import Button from '../../../Container/Custom/Button';
import {RegisterScreenNavigationProps} from '../../../Navigation/types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RadioBtn from '../../../Container/Custom/RadioButton';
import {useDispatch, useSelector} from 'react-redux';
import {addUser} from '../../../Redux/Users/userSlice';

/**
 *
 * @param param0
 * @author Matin Kadri
 *
 * @returns
 */

const Register = ({navigation}: RegisterScreenNavigationProps) => {
  const [passVisible, setPassVisible] = useState(true);
  const [ConfirmPassVisible, setConfirmPassVisible] = useState(true);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    gender: '',
    phone_no: 1231231230,
  });

  const [errors, setErrors] = useState({
    general: '',
    email: '',
    password: '',
    confirm_password: '',
    phone_no: '',
  });

  const onhandleChange = (field: string, value: any) => {
    if (field === 'email') {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(value) === false) {
        setErrors({...errors, email: 'Invalid email format'});
        return;
      }
    }
    if (field === 'password') {
      let reg =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,30}$/;
      if (reg.test(value) === false) {
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
      const phoneNumberRegex = /^\d{10}$/;
      if (phoneNumberRegex.test(value) === false) {
        setErrors({
          ...errors,
          phone_no: 'Phone number should be at least 10 number long',
        });
        return;
      }
    }

    setErrors({...errors, [field]: ''});

    setForm({...form, [field]: value});
  };
  const d = useSelector(state => state.users.success);

  // useEffect(() => {
  //   if (d) {
  //     navigation.navigate('Home');
  //   } else {
  //     navigation.navigate('Register');
  //   }
  // }, []);

  // const data = useSelector(state => state.users.users);
  const isSuccess = useSelector(state => state.users.success);
  const isError = useSelector(state => state.users.error);
  const handlePress = async () => {
    if (
      form.first_name === '' ||
      form.last_name === '' ||
      form.email === '' ||
      form.password === '' ||
      form.confirm_password === '' ||
      form.gender === ''
      // form.phone_no === ''
    ) {
      console.log(form);
      Alert.alert('Please fill in all fields');
      return;
    } else {
      try {
        await dispatch(addUser(form) as any).unwrap();
        navigation.navigate('Tabs');
        if (isError) {
          console.log('Something went wrong');
        }
        // console.log('slecteregister', data);
        console.log('sss', isSuccess);
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
          <CustomText style={styles.LabelStyle} title="First Name" />
          <Input
            placeHolder="john"
            style={styles.TextInputContainer}
            handleChange={value => onhandleChange('first_name', value)}
          />
          <Text style={styles.errorText}>{errors.general}</Text>

          <CustomText style={styles.LabelStyle} title="Last Name" />
          <Input
            placeHolder="Kahh"
            style={styles.TextInputContainer}
            handleChange={value => onhandleChange('last_name', value)}
          />
          <Text style={styles.errorText}>{errors.general}</Text>

          <CustomText style={styles.LabelStyle} title="Email" />
          <Input
            placeHolder="john@gmail.com"
            style={styles.TextInputContainer}
            handleChange={value => onhandleChange('email', value)}
          />
          <Text style={styles.errorText}>{errors.email}</Text>

          <CustomText style={styles.LabelStyle} title="Password" />
          <Input
            placeHolder="Jon@123"
            style={styles.TextInputContainer}
            secure={passVisible}
            handleChange={value => onhandleChange('password', value)}
            showIcon={true}
            handleVisible={() => setPassVisible(!passVisible)}
          />

          <Text style={styles.errorText}>{errors.password}</Text>

          <CustomText style={styles.LabelStyle} title="Confirm Password" />
          <Input
            placeHolder="Jon@123"
            style={styles.TextInputContainer}
            secure={ConfirmPassVisible}
            handleChange={value => onhandleChange('confirm_password', value)}
            showIcon={true}
            handleVisible={() => setConfirmPassVisible(!ConfirmPassVisible)}
          />
          <Text style={styles.errorText}>{errors.confirm_password}</Text>

          <CustomText style={styles.LabelStyle} title="Gender" />

          <RadioBtn
            handleChange={value => onhandleChange('gender', value)}
            data={form.gender}
          />
          <Text style={styles.errorText}>{errors.general}</Text>

          <CustomText style={styles.LabelStyle} title="Phone Number" />
          <Input
            style={styles.TextInputContainer}
            placeHolder="1231231230"
            handleChange={value => onhandleChange('phone_no', value)}
          />
          <Text style={styles.errorText}>{errors.phone_no}</Text>

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
    marginVertical: 5,
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
    backgroundColor: colors.ACTIONCOLOR,
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 13,
  },

  signupStyle: {
    alignSelf: 'center',
    marginTop: 12,
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
