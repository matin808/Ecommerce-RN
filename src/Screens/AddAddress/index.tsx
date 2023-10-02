import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  addAddress,
  updateAddress,
  userAddress,
} from '../../Redux/Users/userSlice';
import {useAppDispatch, useAppSelector} from '../../Redux/store';
import {AddressScreensNavigationProps} from '../../Navigation/types';
import {colors} from '../../assets/colors/Colors';
import Toast from 'react-native-simple-toast';

/**
 * @author Matin Kadri
 * @param param0 route for getting address id for updating address
 * @description This will used to create a new address or update an existing address
 * @returns
 */

const AddressScreen = ({route, navigation}: AddressScreensNavigationProps) => {
  console.log('aaaa', route?.params?.id);
  const addressData = useAppSelector(userAddress)?.find(
    (a: any) => a?.id === route?.params?.id,
  );
  const id = route?.params?.id;

  const [address, setAddress] = useState(
    addressData ? addressData?.data?.address : '',
  );
  const [city, setCity] = useState(addressData ? addressData?.data?.city : '');
  const [state, setState] = useState(
    addressData ? addressData?.data?.state : '',
  );
  const [zipCode, setZipCode] = useState(
    addressData ? addressData?.data?.zipCode : '',
  );
  const dispatch = useAppDispatch();

  const handleSaveAddress = () => {
    if (address === '' || city === '' || state === '' || zipCode === '') {
      Alert.alert('All Fields are required');
      return;
    }
    const data = {
      address,
      city,
      state,
      zipCode,
    };
    console.log('myaddress', data);
    dispatch(addAddress(data));
    Toast.show('Address saved', Toast.SHORT);
    navigation.goBack();
  };

  const handleUpdate = () => {
    if (address === '' || city === '' || state === '' || zipCode === '') {
      Alert.alert('All Fields are required');
      return;
    }
    const data = {
      address,
      city,
      state,
      zipCode,
    };
    const main = {data, id};
    dispatch(updateAddress(main));
    Toast.show('Address Updated', Toast.SHORT);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Street Address"
        value={address}
        onChangeText={text => setAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={text => setCity(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={text => setState(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Zip Code"
        value={zipCode}
        onChangeText={text => setZipCode(text)}
      />
      {addressData ? (
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update Address</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSaveAddress}>
          <Text style={styles.buttonText}>Save Address</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.ACTIONCOLOR,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddressScreen;
