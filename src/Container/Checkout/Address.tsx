/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../assets/colors/Colors';
import CustomText from '../Custom/Text';
import {Button, Dialog, Portal, Text, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconComponent from '../Custom/Icon';

const Address = () => {
  const [text, setText] = useState<string>();
  const [visible, setVisible] = React.useState(false);
  const [address, setAddress] = React.useState<any>();
  const [selected, setSelected] = useState(-1);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  console.log(selected);
  const getAddress = async () => {
    try {
      const value = await AsyncStorage.getItem('address');
      console.log('sdsds', value);
      if (value !== null) {
        setAddress(JSON.parse(value));
      }
    } catch (error) {
      console.log('err');
    }
  };

  useEffect(() => {
    getAddress();
  }, [visible]);

  const handlePress = async () => {
    try {
      await AsyncStorage.setItem(
        'address',
        JSON.stringify([
          ...address,
          {id: Math.floor(Math.random() * 100), data: text},
        ]),
        // JSON.stringify([]),
      );
      console.log('11212', text);
      console.log('2222', address);
    } catch (err) {
      console.log('Error Occurred');
    }
    setVisible(false);
    console.log('22345', text);
  };
  console.log(address);
  return (
    <View>
      <View style={styles.addHeader}>
        <CustomText title="Shipping Address" style={styles.textStyle} />

        <Text style={styles.change} onPress={showDialog}>
          <IconComponent name="plus-circle" />
        </Text>
      </View>
      <View>
        <Portal>
          <Dialog
            style={styles.dialog}
            visible={visible}
            onDismiss={hideDialog}>
            <Dialog.Title>Address</Dialog.Title>
            <Dialog.Content>
              <TextInput
                placeholder="Delivery address"
                mode="outlined"
                onChangeText={(txt: string) => setText(txt)}
                multiline={true}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handlePress}>Add address</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
      <FlatList
        data={address}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => setSelected(item?.id)}
            style={[
              styles.addContainer,
              {
                borderColor: selected === item.id ? 'green' : 'lightgray',
                borderWidth: 1,
              },
            ]}>
            <Text style={styles.AddressStyle}>{item?.data}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: colors.TEXTDARK,
    fontSize: 19,
    fontFamily: 'Montserrat-Bold',
  },

  addContainer: {
    backgroundColor: colors.UIBG,
    padding: 15,
    marginTop: 10,
    borderRadius: 12,
  },
  addHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  AddressStyle: {
    color: colors.TEXTDARK,
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
  },

  change: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: 'gray',
  },
  dialog: {
    backgroundColor: '#fff',
  },
});

export default Address;
