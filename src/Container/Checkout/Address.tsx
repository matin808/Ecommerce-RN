/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../assets/colors/Colors';
import CustomText from '../Custom/Text';
import {Text} from 'react-native-paper';
import IconComponent from '../Custom/Icon';
import {useAppDispatch, useAppSelector} from '../../Redux/store';
import {
  deleteAddress,
  selectAddress,
  userAddress,
} from '../../Redux/Users/userSlice';
import {Swipeable} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {MyNavigationProp} from '../../Navigation/types';

const Address = () => {
  const addressData = useAppSelector(userAddress);
  const dispatch = useAppDispatch();
  const navigation: MyNavigationProp = useNavigation();
  const [selected, setSelected] = useState<number>();

  const handleUpdate = (id: number) => {
    navigation.navigate('AddressScreen', {id});
  };

  const handleSelectedAddress = (id: number) => {
    dispatch(selectAddress(id));
    setSelected(id);
  };

  const renderRightActions = (id: number) => {
    console.log('11', id);
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 5,
        }}>
        <TouchableOpacity onPress={() => dispatch(deleteAddress(id))}>
          <IconComponent name="delete" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleUpdate(id)}>
          <IconComponent name="edit" use="AntDesign" />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <View style={styles.addHeader}>
        <CustomText title="Shipping Address" style={styles.textStyle} />

        <Text
          style={styles.change}
          onPress={() => navigation.navigate('AddressScreen')}>
          <IconComponent name="plus-circle" />
        </Text>
      </View>

      <FlatList
        data={addressData}
        renderItem={({item}) => (
          <Swipeable renderRightActions={() => renderRightActions(item?.id)}>
            <TouchableOpacity
              onPress={() => handleSelectedAddress(item?.id)}
              style={[
                styles.addressContainer,
                {
                  borderColor: selected === item?.id ? 'gray' : '#fff',
                  borderWidth: 2,
                },
              ]}>
              <Text style={styles.addressText}>
                {item?.data?.address} {item?.data?.city} {item?.data?.state}{' '}
                {item?.data?.zipCode}
              </Text>
            </TouchableOpacity>
          </Swipeable>
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

  addressContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 16,
  },
});

export default Address;
