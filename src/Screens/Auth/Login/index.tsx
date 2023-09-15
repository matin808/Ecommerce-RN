import {Alert, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../../Container/Custom/Text';
import Input from '../../../Container/Custom/TextInput';
import {colors} from '../../../assets/colors/Colors';
import Button from '../../../Container/Custom/Button';
import {LoginScreenNavigationProps} from '../../../Navigation/types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {signInUser} from '../../../Redux/Users/userSlice';

const Login = ({navigation}: LoginScreenNavigationProps) => {
  const [visiblePass, setVisiblePass] = useState(true);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const onhandleChange = (field: string, value: string) => {
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
    setErrors({...errors, [field]: ''});

    setForm({...form, [field]: value});
  };

  const handlePress = async () => {
    if (form.email === '' || form.password === '') {
      Alert.alert('Both field are required');
    } else {
      console.log(form);
      // axios
      try {
        await dispatch(signInUser(form) as any);
        navigation.replace('Tabs');
      } catch (err) {
        console.log('Sigin err', err);
      }
    }
  };
  return (
    <SafeAreaView style={styles.LoginContainer}>
      <View style={styles.main}>
        <View style={styles.ImageContainer}>
          <Image source={require('../../../assets/images/login.png')} />
        </View>
        <CustomText title="Getting Started " style={styles.TextStyle} />
        <CustomText
          title="Let’s login for explore continues"
          style={styles.subTitleStyle}
        />

        <KeyboardAwareScrollView
          style={styles.formContainer}
          showsVerticalScrollIndicator={false}>
          <CustomText style={styles.LabelStyle} title="Email" />

          <Input
            placeHolder="john@gmail.com"
            style={styles.TextInputContainer}
            handleChange={(value: string) => onhandleChange('email', value)}
          />
          <Text style={styles.errorText}>{errors.email}</Text>
          <CustomText style={styles.LabelStyle} title="Password" />
          <Input
            placeHolder="******"
            style={styles.TextInputContainer}
            secure={visiblePass}
            handleChange={(value: string) => onhandleChange('password', value)}
            showIcon={true}
            handleVisible={() => setVisiblePass(!visiblePass)}
          />
          <Text style={styles.errorText}>{errors.password}</Text>

          <CustomText
            onPress={() => navigation.navigate('ForgetPassword')}
            style={styles.ForgetPassStyle}
            title="Forget Password?"
          />
          <Button
            title="Sign In"
            style={styles.ButtonStyle}
            handlePress={handlePress}
          />
          <Text style={styles.signupStyle}>
            Don’t have an acount?
            <Text
              style={styles.linkStyle}
              onPress={() => navigation.navigate('Register')}>
              {' '}
              Sign up here
            </Text>
          </Text>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  LoginContainer: {
    flex: 1,
    backgroundColor: colors.ACTIONCOLOR,
  },

  main: {
    backgroundColor: '#F9F9F9',
    marginTop: 30,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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

  subTitleStyle: {
    color: 'gray',
    marginLeft: 20,
    fontSize: 16,
    fontFamily: 'Roboto-light',
    marginTop: 5,
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

  ForgetPassStyle: {
    marginLeft: '65%',
    color: 'gray',
    marginTop: 3,
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

export default Login;
