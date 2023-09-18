import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface IIconProps {
  name: string;
  size?: number;
  color?: string;
  handlePress?: () => void;
  use?: string;
  style?: Object;
}

const IconComponent = ({
  name,
  size,
  color,
  handlePress,
  use,
  style,
}: IIconProps) => {
  switch (use) {
    case 'IonIcons': {
      return (
        <IonIcons
          name={name}
          size={size ? size : 30}
          color={color ? color : '#000'}
          onPress={handlePress}
          style={style ? style : null}
        />
      );
    }
    case 'MaterialCommunity': {
      return (
        <MaterialIcon
          name={name}
          size={size ? size : 30}
          color={color ? color : '#000'}
          onPress={handlePress}
          style={style ? style : null}
        />
      );
    }
    case 'AntDesign': {
      return (
        <AntDesign
          name={name}
          size={size ? size : 30}
          color={color ? color : '#000'}
          onPress={handlePress}
          style={style ? style : null}
        />
      );
    }
    default:
      return (
        <MaterialIcon
          name={name}
          size={size ? size : 30}
          color={color ? color : '#000'}
          onPress={handlePress}
          style={style ? style : null}
        />
      );
  }
};

export default IconComponent;
