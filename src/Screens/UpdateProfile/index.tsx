import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Input from '../../Container/Custom/TextInput';
import {Button, PaperProvider, Dialog, Portal} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../Redux/store';
import {getUserData, updateDetails} from '../../Redux/Users/userSlice';
import {colors} from '../../assets/colors/Colors';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-crop-picker';
import {getAvatarUrl} from '../../utils/GetAvatar';

/**
 * @author Matin Kadri
 * @description This will used to update the user account details
 * @returns
 */

export interface IUpdateStateProps {
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  profile_pic: string;
  phone_no: string;
}

const UpdateProfile = () => {
  const data: any = useAppSelector(getUserData);
  const userDetails = data[0];
  console.log('2222222', userDetails);
  const token = userDetails.access_token;
  const usrAvatar = getAvatarUrl(userDetails?.gender);

  const [form, setForm] = useState<IUpdateStateProps>({
    first_name: userDetails.first_name,
    last_name: userDetails.last_name,
    email: userDetails.email,
    dob: userDetails.dob,
    profile_pic: userDetails.profile_pic,
    phone_no: userDetails.phone_no,
  });

  const onHandleChange = (field: string, value: string) => {
    setForm({...form, [field]: value});
    console.log('dddssss', form);
  };
  const dispatch = useAppDispatch();

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const handlePhotoUpload = () => {
    console.log('async upload');
    showDialog();
  };

  const handleCameraFunctionality = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      handleImage(image);
    });
  };
  const handleGalleryFunctionality = () => {
    ImagePicker.openPicker({
      includeBase64: true,
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      handleImage(image);
    });
  };

  const handleImage = (image: any) => {
    const profilePic = 'data:image/jpg;base64,' + image.data;
    console.log('111', profilePic);
    setForm({...form, profile_pic: profilePic});
  };

  const handlePress = async () => {
    // const res = await updateDetails(form, token);
    console.log('12121212', form);
    const data = {form: form, token: token};
    await dispatch(updateDetails(data));
    Toast.show('Profile Updated', Toast.SHORT);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <PaperProvider>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title style={styles.ModalTitle}>Upload Image </Dialog.Title>
            <Dialog.Content>
              <Text onPress={handleCameraFunctionality} style={styles.ModalBtn}>
                Camera
              </Text>
              <Text
                onPress={handleGalleryFunctionality}
                style={styles.ModalBtn}>
                Gallery
              </Text>
              {/* <Text variant="bodyMedium">This is simple dialog</Text> */}
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Close</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {form.profile_pic === '' || form.profile_pic === null ? (
              <TouchableOpacity onPress={handlePhotoUpload}>
                <Image
                  source={{uri: usrAvatar}}
                  width={120}
                  height={120}
                  style={styles.Img}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handlePhotoUpload}>
                <Image
                  source={{uri: form.profile_pic}}
                  width={120}
                  height={120}
                  style={styles.Img}
                />
              </TouchableOpacity>
            )}

            <View style={styles.InputContainer}>
              <Input
                style={styles.textInput}
                value={form.first_name}
                profileIcon={true}
                handleChange={(txt: string) =>
                  onHandleChange('first_name', txt)
                }
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
      </PaperProvider>
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
    marginTop: 30,
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
  ModalTitle: {
    alignSelf: 'center',
  },
  ModalBtn: {
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 10,
    marginVertical: 10,
    alignSelf: 'center',
    fontSize: 16,
    paddingHorizontal: 85,
  },
  InputContainer: {
    marginTop: 20,
  },
  Img: {
    borderRadius: 60,
    alignSelf: 'center',
  },
});

export default UpdateProfile;
