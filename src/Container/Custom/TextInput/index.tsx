import {StyleProp, StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import IconComponent from '../Icon';
import {colors} from '../../../assets/colors/Colors';

interface InputProps {
  placeHolder?: string;
  value?: string;
  style?: StyleProp<Text>;
  secure?: boolean;
  handleChange?: (arg1: any) => void;
  showIcon?: boolean;
  handleVisible?: (arg: any) => void;
}

const Input = (props: InputProps) => {
  const {placeHolder, style, secure, handleChange, showIcon, handleVisible} =
    props;
  return (
    <View style={style}>
      <TextInput
        style={styles.TextInputStyle}
        placeholder={placeHolder}
        secureTextEntry={secure}
        onChangeText={(txt: any) => handleChange(txt)}
      />
      {showIcon ? (
        <View style={{marginRight: 10}}>
          <IconComponent name="eye" color="gray" handlePress={handleVisible} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  TextInputStyle: {
    paddingHorizontal: 10,
    fontSize: 17,
    flex: 1,
    paddingVertical: 6,
    fontFamily: 'Roboto-Regular',
  },
});

export default Input;
