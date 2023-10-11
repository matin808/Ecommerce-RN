// import {Text} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';

interface ITextProps {
  title: string | number;
  style?: Object;
  onPress?: () => void;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
}
const defaultProps: ITextProps = {
  title: 'Sample',
  onPress: () => console.log('pressed'),
  style: {},
  fontFamily: 'Roboto-Regular',
  fontSize: 16,
  color: '#000',
};

const CustomText: React.FC<ITextProps> = props => {
  const {title, style, onPress, fontFamily, fontSize, color} = props;

  return (
    <Text
      style={[
        {fontFamily: fontFamily, fontSize: fontSize, color: color},
        style,
      ]}
      onPress={onPress}>
      {title}
    </Text>
  );
};

CustomText.defaultProps = defaultProps;

export default CustomText;
