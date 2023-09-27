import {StyleProp, StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import IconComponent from '../Icon';
// import {colors} from '../../../assets/colors/Colors';

interface InputProps {
  placeHolder?: string;
  value?: string;
  style?: StyleProp<Text>;
  secure?: boolean;
  handleChange?: ((event: string) => void) | any;
  showIcon?: boolean;
  handleVisible?: () => void;
  profileIcon?: boolean;
  disabled?: boolean;
}

const Input = (props: InputProps) => {
  const {
    placeHolder,
    style,
    secure,
    handleChange,
    showIcon,
    handleVisible,
    value,
    profileIcon,
    disabled,
  } = props;
  return (
    <View style={style}>
      {profileIcon ? <IconComponent name="account" color="gray" /> : null}

      <TextInput
        style={styles.TextInputStyle}
        placeholder={placeHolder}
        secureTextEntry={secure}
        value={value && value}
        onChangeText={txt => handleChange(txt)}
        editable={disabled}
        selectTextOnFocus={disabled}
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
