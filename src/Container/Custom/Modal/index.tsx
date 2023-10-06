import {View, Modal, Alert, StyleSheet} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import CustomText from '../Text';

interface IModalProps {
  modalVisible: boolean;
  setModalVisible: (arg: boolean) => void;
  title?: string;
  showButton?: boolean;
}

const CustomModal = (props: IModalProps) => {
  const {modalVisible, setModalVisible, title} = props;
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.ModalStyle}>
          <View style={styles.container}>
            <CustomText
              style={styles.heading}
              title={title ? title : 'Are you sure'}
            />

            <View style={styles.btnContainer}>
              <Button
                labelStyle={styles.btn}
                textColor="#000"
                onPress={() => setModalVisible(false)}>
                Close
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  ModalStyle: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#000000AA',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingTop: 8,
    // height: 110,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    width: '90%',
    alignSelf: 'center',
  },
  heading: {
    fontSize: 18,
    marginTop: 5,
    fontFamily: 'Poppins-Medium',
  },
  btnContainer: {
    alignItems: 'flex-end',
    marginVertical: 15,
  },
  btn: {fontSize: 17},
});

export default CustomModal;
