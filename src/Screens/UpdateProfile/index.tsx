/* eslint-disable @typescript-eslint/no-shadow */
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
import {UpdateProfileNavigationProps} from '../../Navigation/types';
import DatePicker from 'react-native-date-picker';
import IconComponent from '../../Container/Custom/Icon';
import CustomModal from '../../Container/Custom/Modal';

/**
 * @author Matin Kadri
 * @param naviagtion for navigate user to setting screen
 * @description This will used to update the user account details
 * @returns
 */

export interface IUpdateStateProps {
  first_name: string;
  last_name: string;
  email: string;
  dob: any;
  profile_pic: string;
  phone_no: string;
}

const UpdateProfile = ({navigation}: UpdateProfileNavigationProps) => {
  const data: any = useAppSelector(getUserData);
  const userDetails = data[0];
  const token = userDetails.access_token;
  const usrAvatar = getAvatarUrl(userDetails?.gender);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [form, setForm] = useState<IUpdateStateProps>({
    first_name: userDetails?.first_name,
    last_name: userDetails?.last_name,
    email: userDetails?.email,
    dob: userDetails?.dob,
    profile_pic: userDetails.profile_pic,
    phone_no: userDetails.phone_no,
  });

  const handlePhotoUpload = async () => {
    showDialog();
    console.log('async upload');
  };

  const onHandleChange = (field: string, value: string) => {
    setForm({...form, [field]: value});
    console.log('dddssss', form);
  };
  const dispatch = useAppDispatch();

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const handleCameraFunctionality = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      handleImage(image);
    });
  };
  console.log();
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
    console.log('111000', profilePic);
    setForm({...form, profile_pic: profilePic});
    hideDialog();
  };

  const handlePress = async () => {
    if (
      form.first_name === '' ||
      form.last_name === '' ||
      form.email === '' ||
      form.phone_no === ''
    ) {
      console.log(setDate);
      setModalVisible(true);
      return;
    }
    const data = {form: form, token: token};
    await dispatch(updateDetails(data));
    Toast.show('Profile Updated', Toast.SHORT);
    navigation.goBack();
  };
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 15);
  const [date, setDate] = useState(new Date(maxDate));
  const [open, setOpen] = useState(false);

  const handleDate = (Userdate: Date) => {
    const date = new Date(Userdate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const dob = `${day}-${month}-${year}`;
    console.log('22222', dob);
    setForm({...form, dob: dob});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <PaperProvider>
        <Portal>
          <Dialog style={styles.Modal} visible={visible} onDismiss={hideDialog}>
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
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Close</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        {modalVisible && (
          <CustomModal
            modalVisible={modalVisible}
            title="All details must be filled"
            showButton={true}
            setModalVisible={setModalVisible}
          />
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}>
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
                placeHolder="First Name"
                style={styles.textInput}
                value={form.first_name}
                profileIcon={true}
                handleChange={(txt: string) =>
                  onHandleChange('first_name', txt)
                }
                profileIconName="account"
              />

              <Input
                style={styles.textInput}
                placeHolder="Last Name"
                value={form.last_name}
                profileIcon={true}
                handleChange={(txt: string) => onHandleChange('last_name', txt)}
                profileIconName="account"
              />
              <Input
                style={styles.textInput}
                value={form?.email}
                inputMode={'email'}
                profileIcon={true}
                placeHolder="Enter your email"
                handleChange={(txt: string) => onHandleChange('email', txt)}
                profileIconName="email"
              />
              <Input
                style={styles.textInput}
                value={form.phone_no}
                inputMode={'numeric'}
                profileIcon={true}
                placeHolder="Enter phone number"
                handleChange={(txt: string) => onHandleChange('phone_no', txt)}
                profileIconName="phone"
              />

              <View style={styles.dateStyle}>
                <Input
                  style={styles.textInput}
                  value={form.dob}
                  placeHolder="Enter your DOB"
                  profileIcon={true}
                  disabled={false}
                  profileIconName="party-popper"
                />
                <TouchableOpacity
                  style={styles.calendarIcon}
                  onPress={() => setOpen(true)}>
                  <IconComponent color="gray" name="calendar" use="AntDesign" />
                </TouchableOpacity>
              </View>
              <DatePicker
                modal
                open={open}
                mode="date"
                date={date}
                maximumDate={maxDate}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                  handleDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
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
    backgroundColor: '#D6DBDF',
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
  Modal: {
    backgroundColor: colors.UIBG,
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
  dateStyle: {flexDirection: 'row', alignItems: 'center'},
  calendarIcon: {position: 'absolute', right: 10},
});

export default UpdateProfile;
