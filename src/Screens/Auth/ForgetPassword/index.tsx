import {View, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import IconComponent from '../../../Container/Custom/Icon';
import {colors} from '../../../assets/colors/Colors';
import CustomText from '../../../Container/Custom/Text';
import Input from '../../../Container/Custom/TextInput';
import Button from '../../../Container/Custom/Button';
import {forgetPassword} from '../../../utils/API/ForgotPassword';
import Toast from 'react-native-simple-toast';

const ForgetPassword = () => {
  const [email, setEmail] = useState<string>('');

  const handlePress = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      Alert.alert('Email Address is badly formated');
    } else {
      const status = await forgetPassword(email);
      if (status === 200) {
        Toast.showWithGravity(
          'New password has been sent successfully',
          Toast.SHORT,
          Toast.TOP,
        );
      } else {
        Toast.showWithGravity(
          'Please enter correct email address',
          Toast.SHORT,
          Toast.TOP,
        );
      }
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.Icon}>
        <IconComponent
          size={70}
          name="questioncircleo"
          use="AntDesign"
          color={colors.ACTIONCOLOR}
        />
      </View>
      <CustomText style={styles.Text} title="It's okay! reset your password" />

      <Input
        inputMode={'email'}
        style={styles.InputContainer}
        placeHolder="john@gmail.com"
        handleChange={(txt: string) => setEmail(txt)}
      />

      <Button
        style={styles.BtnStyle}
        title="Send Email"
        handlePress={handlePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.UIBG,
  },
  Icon: {
    marginTop: '15%',
    alignSelf: 'center',
  },

  Text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 22,
    marginVertical: 15,
    color: colors.DEFAULT,
  },

  InputContainer: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.CARDBG,
    marginVertical: 10,
    borderColor: colors.DEFAULT,
    borderWidth: 2,
    borderRadius: 10,
  },

  BtnStyle: {
    backgroundColor: colors.DEFAULT,
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginTop: 15,
  },
});

export default ForgetPassword;
