import {
  View,
  // Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import CustomText from '../../Container/Custom/Text';
import {colors} from '../../assets/colors/Colors';
import {Avatar} from 'react-native-paper';
import {PaperProvider, Text} from 'react-native-paper';
import ChangePassword from '../../Container/Settings/ChangePassword';
import {useAppSelector} from '../../Redux/store';

const Settings = () => {
  const userData = useAppSelector(state => state.users.users[0]);
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  console.log('My user de', userData[0]);

  return (
    <SafeAreaView style={styles.container}>
      <PaperProvider>
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
            <View>
              <Text style={styles.name}>
                {userData.first_name} {userData.last_name}
              </Text>
              <Text style={styles.email}>{userData.email}</Text>
            </View>
          </View>
        </View>

        <ChangePassword
          showDialog={showDialog}
          visible={visible}
          hideDialog={hideDialog}
        />
      </PaperProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  changePassContainer: {},
});

export default Settings;
