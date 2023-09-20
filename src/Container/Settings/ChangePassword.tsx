import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Dialog, Portal, Text} from 'react-native-paper';
import IconComponent from '../Custom/Icon';
import Input from '../Custom/TextInput';
import {colors} from '../../assets/colors/Colors';
import {baseUrl} from '../../utils/constants';
import axios from 'axios';

interface IProps {
  token: string;
  visible: boolean;
  hideDialog: () => void;
  showDialog: () => void;
}

interface IForm {
  old_password: string;
  password: string;
  confirm_password: string;
}
// Ma@111
const ChangePassword = ({token, visible, hideDialog, showDialog}: IProps) => {
  const [form, setForm] = useState<IForm>({
    old_password: '',
    password: '',
    confirm_password: '',
  });

  const onChange = (field: string, value: string) => {
    setForm({...form, [field]: value});
  };

  const handleChangePassword = async (myForm: IForm) => {
    console.log('asasdddd', myForm);
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

  const handlePress = () => {
    handleChangePassword(form);
    console.log(form);
  };
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.heading}>Change Password</Text>
        <IconComponent
          handlePress={showDialog}
          name="arrowright"
          use="AntDesign"
          color="#000"
          size={35}
        />
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Change Your Password</Dialog.Title>

          <Dialog.Content>
            <Text variant="bodyMedium">Old Password</Text>
            <Input
              style={styles.TextInputContainer}
              secure={true}
              showIcon={true}
              handleChange={txt => onChange('old_password', txt)}
            />
            <Text variant="bodyMedium">New Password</Text>
            <Input
              style={styles.TextInputContainer}
              secure={true}
              handleChange={txt => onChange('password', txt)}
            />
            <Text variant="bodyMedium">Confirm Password</Text>
            <Input
              style={styles.TextInputContainer}
              secure={true}
              handleChange={txt => onChange('confirm_password', txt)}
            />
          </Dialog.Content>
          <Button
            textColor="#000"
            buttonColor={colors.ACTIONCOLOR}
            mode="elevated"
            style={{marginBottom: 20, marginHorizontal: 30}}
            onPress={handlePress}>
            Change Password
          </Button>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginHorizontal: 10,
  },
  heading: {
    fontSize: 20,
    fontFamily: 'Roboto-light',
  },
  TextInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: colors.UIBG,
    marginVertical: 5,
    borderColor: colors.TEXT,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default ChangePassword;
