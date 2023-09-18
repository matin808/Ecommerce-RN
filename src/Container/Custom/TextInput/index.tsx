import {StyleProp, StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import IconComponent from '../Icon';
// import {colors} from '../../../assets/colors/Colors';

interface InputProps {
  placeHolder?: string;
  value?: string;
  style?: StyleProp<Text>;
  secure?: boolean;
  handleChange: (event: string) => void;
  showIcon?: boolean;
  handleVisible?: () => void;
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
        onChangeText={txt => handleChange(txt)}
      />
      {showIcon ? (
        <View style={styles.IconStyle}>
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
  IconStyle: {
    marginRight: 10,
  },
});

export default Input;
