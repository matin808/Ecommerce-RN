import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Dialog, Portal, Text} from 'react-native-paper';
import IconComponent from '../Custom/Icon';
import Input from '../Custom/TextInput';
import {colors} from '../../assets/colors/Colors';
import {handleChangePassword} from '../../utils/API/changePassword';
import {validatePassword} from '../../utils/Validator';

interface IProps {
  token: string;
  visible: boolean;
  hideDialog: () => void;
  showDialog: () => void;
}

export interface IForm {
  old_password: string;
  password: string;
  confirm_password: string;
}
// Ma@111
const ChangePassword = ({token, visible, hideDialog, showDialog}: IProps) => {
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
    <View>
      {/* <View style={styles.main}>
        <Text style={styles.heading}>Change Password</Text>
        <IconComponent
          handlePress={showDialog}
          name="arrowright"
          use="AntDesign"
          color="#000"
          size={35}
        />
      </View> */}
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={styles.DialogContainer}>
          <Dialog.Title>Change Your Password</Dialog.Title>

          <Dialog.Content>
            <Text variant="bodyMedium">Old Password</Text>
            <Input
              style={styles.TextInputContainer}
              secure={oldPass}
              showIcon={true}
              handleVisible={() => setOldPass(!oldPass)}
              handleChange={txt => onChange('old_password', txt)}
            />
            <Text style={styles.errorText}>{errors.old_password}</Text>
            <Text variant="bodyMedium">New Password</Text>
            <Input
              style={styles.TextInputContainer}
              secure={passVisible}
              showIcon={true}
              handleChange={txt => onChange('password', txt)}
              handleVisible={() => setPassVisible(!passVisible)}
            />
            <Text style={styles.errorText}>{errors.password}</Text>

            <Text variant="bodyMedium">Confirm Password</Text>
            <Input
              style={styles.TextInputContainer}
              secure={ConfirmPassVisible}
              showIcon={true}
              handleChange={txt => onChange('confirm_password', txt)}
              handleVisible={() => setConfirmPassVisible(!ConfirmPassVisible)}
            />
            <Text style={styles.errorText}>{errors.confirm_password}</Text>
          </Dialog.Content>
          <Button
            textColor="#fff"
            buttonColor={colors.TEXT}
            mode="elevated"
            style={styles.btn}
            onPress={handlePress}>
            Change Password
          </Button>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 20,
    fontFamily: 'Roboto-light',
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
  DialogContainer: {backgroundColor: '#fff', paddingHorizontal: 10},
  btn: {marginBottom: 20, marginHorizontal: 30},
  errorText: {
    color: 'red',
    fontWeight: '500',
    marginTop: 5,
    marginLeft: 5,
  },
});

export default ChangePassword;
