import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  addAddress,
  updateAddress,
  userAddress,
} from '../../Redux/Users/userSlice';
import {useAppDispatch, useAppSelector} from '../../Redux/store';
import {AddressScreensNavigationProps} from '../../Navigation/types';

const AddressScreen = ({route}: AddressScreensNavigationProps) => {
  console.log('aaaa', route?.params?.id);
  const addressData = useAppSelector(userAddress).find(
    (a: any) => a?.id === route?.params?.id,
  );
  const id = route?.params?.id;

  console.log('mydata', addressData);

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
    const data = {
      address,
      city,
      state,
      zipCode,
    };
    dispatch(addAddress(data));
  };

  const handleUpdate = () => {
    const data = {
      address,
      city,
      state,
      zipCode,
    };
    const main = {data, id};
    dispatch(updateAddress(main));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add an Address</Text>
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
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddressScreen;
