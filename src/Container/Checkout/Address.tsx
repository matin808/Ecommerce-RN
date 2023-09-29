/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../assets/colors/Colors';
import CustomText from '../Custom/Text';
import {Button, Dialog, Portal, Text, TextInput} from 'react-native-paper';
import IconComponent from '../Custom/Icon';
import {useAppDispatch, useAppSelector} from '../../Redux/store';
import {
  addAddress,
  deleteAddress,
  userAddress,
} from '../../Redux/Users/userSlice';
import {Swipeable} from 'react-native-gesture-handler';

const Address = () => {
  const [text, setText] = useState<string>();
  const [visible, setVisible] = React.useState(false);
  const addressData = useAppSelector(userAddress);
  const [selected, setSelected] = useState(-1);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const dispatch = useAppDispatch();
  console.log('112211122', addressData);

  const handlePress = () => {
    dispatch(addAddress(text));
    setVisible(false);
  };

  // console.log(address);

  const renderRightActions = (id: number) => {
    console.log(id);
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
      </View>
    );
  };
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
        data={addressData}
        renderItem={({item}) => (
          <Swipeable renderRightActions={() => renderRightActions(item.id)}>
            <TouchableOpacity
              onPress={() => setSelected(item?.id)}
              style={[
                styles.addContainer,
                {
                  borderColor: selected === item.id ? 'green' : 'lightgray',
                  borderWidth: 1,
                },
              ]}>
              <Text style={styles.AddressStyle}>{item.data}</Text>
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
});

export default Address;
