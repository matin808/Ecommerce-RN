import {Text} from 'react-native';
import React from 'react';

interface ITextProps {
  title: string;
  style?: Object;
  onPress?: () => void;
}

const CustomText = (props: ITextProps) => {
  const {title, style, onPress} = props;
  return (
    <Text style={style} onPress={onPress}>
      {title}
    </Text>
  );
};

export default CustomText;
