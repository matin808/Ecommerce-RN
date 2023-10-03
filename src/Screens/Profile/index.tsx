import {View, SafeAreaView, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import Input from '../../Container/Custom/TextInput';
import {useAppSelector} from '../../Redux/store';
import {getUserData} from '../../Redux/Users/userSlice';
// import {fetchUserDetails} from '../../utils/API/FetchUserDetails';
import {colors} from '../../assets/colors/Colors';
import {ProfileNavigationProps} from '../../Navigation/types';
import {getAvatarUrl} from '../../utils/GetAvatar';

/**
 * @author Matin Kadri
 * @param navigation this is used to navigate user to update sreen
 * @description This component will render user profile and their information
 * @returns
 */

const Profile = ({navigation}: ProfileNavigationProps) => {
  const data: any = useAppSelector(getUserData);
  console.log('ds', data);
  const userDetails = data[0];
  const usrAvatar = getAvatarUrl(userDetails?.gender);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {userDetails?.profile_pic === '' ||
        userDetails?.profile_pic === null ? (
          <Image
            source={{uri: usrAvatar}}
            style={styles.avatar}
            height={130}
            width={130}
          />
        ) : (
          <Image
            source={{uri: userDetails?.profile_pic}}
            style={styles.avatar}
            height={130}
            width={130}
          />
        )}

        <View>
          <Input
            style={styles.textInput}
            value={userDetails?.first_name}
            profileIcon={true}
            disabled={false}
            profileIconName="account"
          />

          <Input
            style={styles.textInput}
            value={userDetails?.last_name}
            profileIcon={true}
            disabled={false}
            profileIconName="account"
          />
          <Input
            style={styles.textInput}
            value={userDetails?.email}
            profileIcon={true}
            disabled={false}
            profileIconName="email"
          />
          <Input
            style={styles.textInput}
            value={userDetails?.phone_no}
            profileIcon={true}
            disabled={false}
            profileIconName="phone"
          />
        </View>

        <Button
          mode="contained"
          style={styles.editButton}
          onPress={() => {
            navigation.replace('UpdateProfile');
          }}>
          Edit Profile
        </Button>
      </View>
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
    borderRadius: 100,
    // backgroundColor: colors.ACTIONCOLOR,
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
    marginTop: 20,
    backgroundColor: colors.ACTIONCOLOR,
    borderRadius: 8,
  },
});

export default Profile;
