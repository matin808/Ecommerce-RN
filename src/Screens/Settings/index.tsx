import {
  View,
  // Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../Container/Custom/Text';
import {colors} from '../../assets/colors/Colors';
import {Avatar} from 'react-native-paper';
import {PaperProvider, Text} from 'react-native-paper';
import ChangePassword from '../../Container/Settings/ChangePassword';
import {useAppDispatch, useAppSelector} from '../../Redux/store';
import IconComponent from '../../Container/Custom/Icon';
import {SettingsNavigationProps} from '../../Navigation/types';
import {logoutUser} from '../../Redux/Users/userSlice';

/**
 * @author Matin Kadri
 * @param navigation for navigation user to different settings location
 * @description It will list down settings options for the current user to use
 * @returns
 */

const Settings = ({navigation}: SettingsNavigationProps) => {
  const userData = useAppSelector(state => state?.users?.users[0]);
  const token = userData?.access_token;
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  // console.log('My user de', userData[0]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.navigate('Login');
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.main}>
          <CustomText style={styles.heading} title="My Profile" />
          <View style={styles.profileContainer}>
            <Avatar.Icon
              size={54}
              color="#000"
              icon={
                // userData.profile_pic
                //   ? require(userData.profile_pic) :
                require('../../assets/images/sofa.png')
              }
            />
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.name}>
                {userData?.first_name} {userData?.last_name}
              </Text>
              <Text style={styles.email}>{userData?.email}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listContainer}>
          <ChangePassword
            token={token}
            showDialog={showDialog}
            visible={visible}
            hideDialog={hideDialog}
          />
          {/* UPDATE PROFILE */}
          <View style={styles.updateHeader}>
            <Text style={styles.DetailHeading}>Update Your Profile</Text>
            <IconComponent
              handlePress={() => navigation.navigate('UpdateProfile')}
              name="arrowright"
              use="AntDesign"
              color="#000"
              size={35}
            />
          </View>

          {/* LOGOUT */}
          <View style={styles.updateHeader}>
            <Text style={styles.DetailHeading}>Logout</Text>
            <IconComponent
              handlePress={handleLogout}
              name="arrowright"
              use="AntDesign"
              color="#000"
              size={35}
            />
            {/* <IconComponent name="logout" handlePress={handleLogout} /> */}
          </View>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  main: {
    margin: 15,
  },

  heading: {
    fontSize: 25,
    fontFamily: 'Roboto-regular',
    color: colors.TEXT,
  },

  profileContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    color: colors.TEXTDARK,
  },
  email: {
    fontSize: 16,
    fontFamily: 'Roboto-light',
    color: colors.TEXT,
  },
  listContainer: {
    marginHorizontal: 10,
  },

  updateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  DetailHeading: {
    fontSize: 20,
  },
});

export default Settings;
