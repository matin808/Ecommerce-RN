import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import IconComponent from '../../../Container/Custom/Icon';
import {colors} from '../../../assets/colors/Colors';
import CustomText from '../../../Container/Custom/Text';
import Input from '../../../Container/Custom/TextInput';
import Button from '../../../Container/Custom/Button';

const ForgetPassword = () => {
  const [email, setEmail] = useState();
  const handlePress = () => {
    console.log(email);
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
        style={styles.InputContainer}
        placeHolder="john@gmail.com"
        handleChange={txt => setEmail(txt)}
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
    color: colors.ACTIONCOLOR,
  },

  InputContainer: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.CARDBG,
    marginVertical: 10,
    borderColor: colors.ACTIONCOLOR,
    borderWidth: 2,
    borderRadius: 10,
  },

  BtnStyle: {
    backgroundColor: colors.ACTIONCOLOR,
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginTop: 15,
  },
});

export default ForgetPassword;
