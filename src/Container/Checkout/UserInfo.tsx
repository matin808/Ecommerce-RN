import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../assets/colors/Colors';
import CustomText from '../Custom/Text';
import {useAppSelector} from '../../Redux/store';
import {getUserData} from '../../Redux/Users/userSlice';

const UserInfo = () => {
  const userDetails: any = useAppSelector(getUserData);
  console.log(userDetails);
  const user = userDetails[0];
  return (
    <View>
      <CustomText title="Your Details" style={styles.textStyle} />
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.text}>{user.username}</Text>
        </View>
        <View style={styles.main}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{user.email}</Text>
        </View>
        <View style={styles.main}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.text}>
            {user.first_name} {user.last_name}
          </Text>
        </View>
        <View style={styles.main}>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.text}>{user.phone_no}</Text>
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  textStyle: {
    color: colors.TEXTDARK,
    fontSize: 19,
    marginTop: 15,
    fontFamily: 'Montserrat-Bold',
  },
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    marginBottom: 5,
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  btn: {
    marginVertical: 20,
  },
});

export default UserInfo;
