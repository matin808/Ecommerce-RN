import {StyleProp, StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import IconComponent from '../Icon';
// import {colors} from '../../../assets/colors/Colors';

interface InputProps {
  placeHolder?: string;
  value?: string;
  style?: StyleProp<Text>;
  secure?: boolean;
  handleChange?: ((event: any) => void) | any;
  showIcon?: boolean;
  handleVisible?: () => void;
  profileIcon?: boolean;
  disabled?: boolean;
  profileIconName?: string;
  inputMode?: any;
  editable?: boolean;
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
    profileIconName,
    inputMode,
  } = props;
  return (
    <View style={style}>
      {profileIcon ? (
        <IconComponent
          style={styles.LeftIconStyle}
          name={profileIconName}
          color="gray"
        />
      ) : null}

      <TextInput
        style={styles.TextInputStyle}
        placeholder={placeHolder}
        placeholderTextColor={'lightgray'}
        secureTextEntry={secure}
        value={value && value}
        onChangeText={txt => handleChange(txt)}
        editable={disabled}
        selectTextOnFocus={disabled}
        autoCorrect={false}
        inputMode={inputMode ? inputMode : 'text'}
        autoCapitalize="none"
      />
      {showIcon ? (
        <View style={styles.IconStyle}>
          <IconComponent
            size={28}
            name={secure ? 'eye-off' : 'eye'}
            color="gray"
            handlePress={handleVisible}
          />
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
    color: '#000',
  },
  LeftIconStyle: {alignSelf: 'center'},
  IconStyle: {
    marginRight: 10,
    alignSelf: 'center',
  },
});

export default Input;
