/* eslint-disable react/no-unstable-nested-components */
import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import IconComponent from '../Icon';
import {List} from 'react-native-paper';

interface IListProps {
  onPress: () => void;
  iconName: string;
  iconSize?: number;
  title: string;
  desc: string;
  use?: string;
}

const IconList = (props: IListProps) => {
  const {onPress, iconName, iconSize, title, desc, use} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <List.Item
        titleStyle={styles.title}
        title={title}
        description={desc}
        left={() => (
          <IconComponent
            name={iconName}
            style={styles.IconStyle}
            use={use}
            color="#000"
            size={iconSize ? iconSize : 32}
          />
        )}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    marginTop: 10,
  },

  title: {
    fontSize: 20,

    fontFamily: 'Monterrack-Light',
  },

  IconStyle: {
    alignSelf: 'center',
  },
});

export default IconList;
