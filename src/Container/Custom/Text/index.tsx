import {Text} from 'react-native';
import React from 'react';

interface ITextProps {
  title: string;
  style?: Object;
  onPress?: () => void;
  fontFamily?: string;
  fontSize?: number;
}
const defaultProps: ITextProps = {
  title: 'Sample',
  onPress: () => console.log('pressed'),
  style: {},
  fontFamily: 'Roboto-Regular',
  fontSize: 18,
};

const CustomText: React.FC<ITextProps> = props => {
  const {title, style, onPress, fontFamily, fontSize} = props;

  return (
    <Text
      style={[{fontFamily: fontFamily, fontSize: fontSize}, style]}
      onPress={onPress}>
      {title}
    </Text>
  );
};

CustomText.defaultProps = defaultProps;

export default CustomText;
