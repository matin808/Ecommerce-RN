import {View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Input from '../../Container/Custom/TextInput';
import {Avatar, Button} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../Redux/store';
import {getUserData, updateDetails} from '../../Redux/Users/userSlice';
import {colors} from '../../assets/colors/Colors';
import Toast from 'react-native-simple-toast';
/**
 * @author Matin Kadri
 * @description This will used to update the user account details
 * @returns
 */

const UpdateProfile = () => {
  const data: any = useAppSelector(getUserData);
  const userDetails = data[0];
  const token = userDetails.access_token;

  const [form, setForm] = useState({
    first_name: userDetails.first_name,
    last_name: userDetails.last_name,
    email: userDetails.email,
    dob: userDetails.dob,
    profile_pic: userDetails.profile_pic,
    phone_no: userDetails.phone_no,
  });

  const onHandleChange = (field: string, value: string) => {
    setForm({...form, [field]: value});
  };
  const dispatch = useAppDispatch();
  const handlePress = async () => {
    // const res = await updateDetails(form, token);

    const data = {form: form, token: token};
    await dispatch(updateDetails(data));
    Toast.show('Profile Updated', Toast.SHORT);
  };

  console.log(userDetails, 'sdds');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Avatar.Icon
            size={120}
            color="#fff"
            style={styles.avatar}
            icon="account"
          />

          <View>
            <Input
              style={styles.textInput}
              value={form.first_name}
              profileIcon={true}
              handleChange={(txt: string) => onHandleChange('first_name', txt)}
            />

            <Input
              style={styles.textInput}
              value={form.last_name}
              profileIcon={true}
              handleChange={(txt: string) => onHandleChange('last_name', txt)}
            />
            <Input
              style={styles.textInput}
              value={form?.email}
              profileIcon={true}
              placeHolder="Enter your email"
              handleChange={(txt: string) => onHandleChange('email', txt)}
            />
            <Input
              style={styles.textInput}
              value={form.phone_no}
              profileIcon={true}
              placeHolder="Enter phone number"
              handleChange={(txt: string) => onHandleChange('phone_no', txt)}
            />
            <Input
              style={styles.textInput}
              value={form.profile_pic}
              profileIcon={true}
              placeHolder="Enter Your Profile Pic Url"
              handleChange={(txt: string) => onHandleChange('profile_pic', txt)}
            />
            <Input
              style={styles.textInput}
              value={form.dob}
              placeHolder="Enter your DOB"
              profileIcon={true}
              handleChange={(txt: string) => onHandleChange('dob', txt)}
            />
          </View>

          <Button
            mode="contained"
            style={styles.editButton}
            onPress={handlePress}>
            Submit
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D7DBDD',
  },
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginTop: 10,
  },
  avatar: {
    alignSelf: 'center',
    marginVertical: 25,
    backgroundColor: colors.ACTIONCOLOR,
  },
  textInput: {
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    fontFamily: 'Roboto-Bold',
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: colors.UIBG,
    borderWidth: 2,
  },
  editButton: {
    marginVertical: 20,
    backgroundColor: colors.ACTIONCOLOR,
    borderRadius: 8,
  },
});

export default UpdateProfile;
