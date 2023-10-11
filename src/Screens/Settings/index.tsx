import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import React from 'react';
import CustomText from '../../Container/Custom/Text';
import {Divider, Tooltip} from 'react-native-paper';
import {PaperProvider, Text} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../Redux/store';
import IconComponent from '../../Container/Custom/Icon';
import {SettingsNavigationProps} from '../../Navigation/types';
import {logoutUser} from '../../Redux/Users/userSlice';
import {getAvatarUrl} from '../../utils/GetAvatar';
import IconList from '../../Container/Custom/List';

/**
 * @author Matin Kadri
 * @param navigation for navigation user to different settings location
 * @description It will list down settings options for the current user to use
 * @returns
 */

const Settings = ({navigation}: SettingsNavigationProps) => {
  const userData = useAppSelector(state => state?.users?.users[0]);
  const dispatch = useAppDispatch();
  console.log('My user de', userData);

  const logOut = () => {
    dispatch(logoutUser());
    navigation.navigate('Login');
  };

  const handleLogout = () => {
    Alert.alert('Are you sure', 'You will be redirected to login page', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: logOut},
    ]);
  };

  const usrAvatar = getAvatarUrl(userData?.gender);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView alwaysBounceVertical={false}>
          <View style={styles.main}>
            <View style={styles.profileContainer}>
              <View style={styles.ProfileCtnOne}>
                <Tooltip title="View Profile">
                  <CustomText
                    style={styles.name}
                    onPress={() => navigation.navigate('Profile')}
                    title={userData?.first_name + ' ' + userData?.last_name}
                  />
                </Tooltip>
                <Text style={styles.email}>{userData?.email}</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('UpdateProfile')}
                  style={styles.btnContainer}>
                  <Text style={styles.EditText}>edit profile?</Text>
                  <IconComponent
                    size={20}
                    color="blue"
                    name="edit"
                    use="AntDesign"
                  />
                </TouchableOpacity>
              </View>
              <View>
                {userData?.profile_pic === '' ||
                userData?.profile_pic === null ? (
                  <>
                    <Image
                      style={styles.ImgCtn}
                      source={{
                        uri: usrAvatar,
                      }}
                      height={115}
                      width={115}
                    />
                  </>
                ) : (
                  <Image
                    style={styles.ImgCtn}
                    source={{
                      uri: userData?.profile_pic,
                    }}
                    height={100}
                    width={100}
                  />
                )}
              </View>
            </View>
          </View>
          <Divider />
          {/*  */}
          <View style={styles.statistics}>
            <CustomText style={styles.statisticsTitle} title="Statistics" />
            <View style={styles.statisticsCtn}>
              <View>
                <CustomText
                  title="Orders in cart"
                  style={styles.statisticsHeadingText}
                />
                <CustomText title="23" style={styles.statisticsvalue} />
              </View>

              <View>
                <CustomText
                  title="Order delivered"
                  style={styles.statisticsHeadingText}
                />
                <CustomText title="12" style={styles.statisticsvalue} />
              </View>
            </View>
          </View>

          {/* Additional List */}
          <View style={styles.listContainer}>
            <CustomText
              style={styles.statisticsTitle}
              title="Additional Settings"
            />

            <IconList
              iconName="security"
              onPress={() => navigation.navigate('ChangePassword')}
              title="Change Password"
              desc="Refresh Your Security, Reset Your Passcode."
            />
            <IconList
              iconName="slack-square"
              use="AntDesign"
              onPress={() => navigation.navigate('UpdateProfile')}
              title="Update Profile"
              desc="Elevate Your Presence, Enhance Your Profile."
            />
            <IconList
              iconName="logout"
              use="AntDesign"
              iconSize={29}
              onPress={handleLogout}
              title="Logout"
              desc="Secure Your Exit, Log Out Safely"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  main: {
    padding: 15,
  },

  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  ProfileCtnOne: {
    alignSelf: 'center',
    marginLeft: 6,
  },
  name: {
    fontSize: 25,
    fontFamily: 'Poppins-Bold',
  },
  email: {
    fontSize: 18,
    fontFamily: 'Roboto-light',
    color: 'gray',
  },

  btnContainer: {
    flexDirection: 'row',
    borderRadius: 20,
    paddingVertical: 8,
    gap: 5,
    alignItems: 'center',
  },
  EditText: {
    color: 'blue',
    fontSize: 18,
  },

  ImgCtn: {
    borderRadius: 50,
    marginRight: 5,
  },
  listContainer: {
    minHeight: '100%',
    paddingHorizontal: 15,
  },

  statistics: {
    marginVertical: 20,
    marginHorizontal: 15,
  },
  statisticsTitle: {
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold',
  },

  statisticsCtn: {
    backgroundColor: '#F2F3F4',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 5,
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
  },

  statisticsHeadingText: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
  statisticsvalue: {
    fontSize: 22,
    margin: 10,
    alignSelf: 'center',
    fontFamily: 'Montserrat-Bold',
  },
});

export default Settings;
