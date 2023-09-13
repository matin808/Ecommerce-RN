import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../../Container/Custom/Text';
import Input from '../../../Container/Custom/TextInput';
import {colors} from '../../../assets/colors/Colors';
import Button from '../../../Container/Custom/Button';
import {RegisterScreenNavigationProps} from '../../../Navigation/types';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RadioBtn from '../../../Container/Custom/RadioButton';
import axios from 'axios';
// import axios from 'axios';

const Register = ({navigation}: RegisterScreenNavigationProps) => {
  const [visiblePass, setVisiblePass] = useState(true);

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    gender: '',
    phone_no: 1234567890,
  });

  const onhandleChange = (field: string, value: any) => {
    if (field === 'email') {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(value) === false) {
        console.log('Email is Not Correct');
        // setState({email: text});
        return false;
      }
    }
    setForm({...form, [field]: value});
  };
  const handlePress = () => {
    console.log(form);
    var bodyFormData = new FormData();
    bodyFormData.append('first_name', form.first_name);
    bodyFormData.append('last_name', form.last_name);
    bodyFormData.append('email', form.email);
    bodyFormData.append('password', form.password);
    bodyFormData.append('confirm_password', form.confirm_password);
    bodyFormData.append('gender', form.gender);
    bodyFormData.append('phone_no', form.phone_no);
    console.log('body', bodyFormData);
    // axios({
    //   method: 'post',
    //   url: 'http://staging.php-dev.in:8844/trainingapp/api/users/register',
    //   data: bodyFormData,
    //   redirect: 'follow',
    // })
    axios
      .post(
        'http://staging.php-dev.in:8844/trainingapp/api/users/register',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
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
          <CustomText style={styles.LabelStyle} title="Last Name" />
          <Input
            placeHolder="Kahh"
            style={styles.TextInputContainer}
            handleChange={value => onhandleChange('last_name', value)}
          />
          <CustomText style={styles.LabelStyle} title="Email" />
          <Input
            placeHolder="john@gmail.com"
            style={styles.TextInputContainer}
            handleChange={value => onhandleChange('email', value)}
          />
          <CustomText style={styles.LabelStyle} title="Password" />
          <Input
            placeHolder="Jon@123"
            style={styles.TextInputContainer}
            secure={visiblePass}
            handleChange={value => onhandleChange('password', value)}
            showIcon={true}
            handleVisible={() => setVisiblePass(!visiblePass)}
          />
          <CustomText style={styles.LabelStyle} title="Confirm Password" />
          <Input
            placeHolder="Jon@123"
            style={styles.TextInputContainer}
            secure={visiblePass}
            handleChange={value => onhandleChange('confirm_password', value)}
            showIcon={true}
            handleVisible={() => setVisiblePass(!visiblePass)}
          />
          <CustomText style={styles.LabelStyle} title="Gender" />

          <RadioBtn
            handleChange={value => onhandleChange('gender', value)}
            data={form.gender}
          />
          <CustomText style={styles.LabelStyle} title="Phone Number" />
          <Input
            style={styles.TextInputContainer}
            placeHolder="+91"
            handleChange={value => onhandleChange('phone_no', value)}
          />
          <Button
            handlePress={handlePress}
            title="Register"
            style={styles.ButtonStyle}
          />
          <Text style={styles.signupStyle}>
            Already have an acount?
            <Text onPress={() => navigation.navigate('Login')}>
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
    // marginBottom: 50,
  },

  ImageContainer: {
    alignSelf: 'center',
    marginTop: 20,
    // flex: 0.65,
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
    // flex: 1,
    backgroundColor: colors.UIBG,
    marginVertical: 5,
    borderColor: colors.UIBG,
    borderWidth: 2,
    borderRadius: 10,
  },

  formContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    // minHeight: '50%', // here
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
});

export default Register;
