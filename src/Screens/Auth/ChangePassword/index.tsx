import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {handleChangePassword} from '../../../utils/API/changePassword';
import {validatePassword} from '../../../utils/Validator';
import CustomText from '../../../Container/Custom/Text';
import {Button} from 'react-native-paper';
import {colors} from '../../../assets/colors/Colors';
import Input from '../../../Container/Custom/TextInput';
import {useAppSelector} from '../../../Redux/store';
import {userToken} from '../../../Redux/Users/userSlice';
import IconComponent from '../../../Container/Custom/Icon';

/**
 * @author Matin Kadri
 * @description This page is used to let user to change their password
 */

export interface IForm {
  old_password: string;
  password: string;
  confirm_password: string;
}

const ChangePassword = () => {
  const token = useAppSelector(userToken);
  const [oldPass, setOldPass] = useState(true);
  const [passVisible, setPassVisible] = useState(true);
  const [ConfirmPassVisible, setConfirmPassVisible] = useState(true);
  const [form, setForm] = useState<IForm>({
    old_password: '',
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState({
    old_password: '',
    password: '',
    confirm_password: '',
  });

  const onChange = (field: string, value: string) => {
    if (field === 'old_password' || field === 'password') {
      if (!validatePassword(value)) {
        setErrors({
          ...errors,
          [field]: 'Password should be 6 character long',
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
    setErrors({...errors, [field]: ''});

    setForm({...form, [field]: value});
  };

  const handlePress = () => {
    handleChangePassword(form, token);
    console.log(form);
  };
  return (
    <View style={styles.main}>
      <IconComponent
        name="checkcircle"
        use="AntDesign"
        size={70}
        style={styles.Icon}
      />
      <CustomText style={styles.heading} title="Change Your Password" />
      <View style={styles.Container}>
        <CustomText title="Old Password" />

        <Input
          style={styles.TextInputContainer}
          secure={oldPass}
          showIcon={true}
          handleVisible={() => setOldPass(!oldPass)}
          handleChange={(txt: string) => onChange('old_password', txt)}
        />
        <Text style={styles.errorText}>{errors.old_password}</Text>

        <CustomText title="New Password" />

        <Input
          style={styles.TextInputContainer}
          secure={passVisible}
          showIcon={true}
          handleChange={(txt: string) => onChange('password', txt)}
          handleVisible={() => setPassVisible(!passVisible)}
        />
        <Text style={styles.errorText}>{errors.password}</Text>

        <CustomText title="Confirm Password" />

        <Input
          style={styles.TextInputContainer}
          secure={ConfirmPassVisible}
          showIcon={true}
          handleChange={(txt: string) => onChange('confirm_password', txt)}
          handleVisible={() => setConfirmPassVisible(!ConfirmPassVisible)}
        />
        <Text style={styles.errorText}>{errors.confirm_password}</Text>
      </View>
      <Button
        textColor="#fff"
        buttonColor={colors.ACTIONCOLOR}
        mode="elevated"
        style={styles.btn}
        onPress={handlePress}>
        Change Password
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
  },
  Icon: {
    alignSelf: 'center',
    marginVertical: 30,
    color: colors.ACTIONCOLOR,
  },
  heading: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'center',
    color: colors.ACTIONCOLOR,
    marginBottom: 30,
  },

  Container: {
    marginHorizontal: 20,
  },
  TextInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    borderColor: colors.TEXT,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 0,
  },

  btn: {marginVertical: 10, marginHorizontal: 20},
  errorText: {
    color: 'red',
    fontWeight: '500',
    marginTop: 5,
    marginLeft: 5,
  },
});

export default ChangePassword;
