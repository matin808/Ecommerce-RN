import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../../assets/colors/Colors';

interface ButtonProps {
  title: string;
  // handlePress: (arg: any) => void;
  style?: Object;
  handlePress: (arg: any) => void;
}

const Button = (props: ButtonProps) => {
  const {style, title, handlePress} = props;
  return (
    <TouchableOpacity style={[style, styles.ButtonStyle]} onPress={handlePress}>
      <Text style={styles.TextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ButtonStyle: {},
  TextStyle: {
    alignSelf: 'center',
    color: colors.UIBG,
    fontSize: 19,
    fontFamily: 'Roboto-Re',
  },
});

export default Button;
