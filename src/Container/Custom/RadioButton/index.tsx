import React, {useMemo} from 'react';
import {colors} from '../../../assets/colors/Colors';
import {RadioGroup} from 'react-native-radio-buttons-group';
import {StyleSheet, View} from 'react-native';

interface IRadioBtn {
  handleChange: (arg: string) => void;
  data: string;
}

const RadioBtn = (props: IRadioBtn) => {
  const {handleChange, data} = props;
  const radioButtons = useMemo(
    () => [
      {
        id: 'M',
        label: 'Male',
        color: colors.DEFAULT,
        labelStyle: {color: '#000'},
      },
      {
        id: 'F',
        label: 'Female',
        color: colors.DEFAULT,
        labelStyle: {color: '#000'},
      },
    ],
    [],
  );
  return (
    <View style={styles.Container}>
      <RadioGroup
        layout="row"
        radioButtons={radioButtons}
        onPress={t => handleChange(t)}
        selectedId={data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginTop: 5,
  },
});

export default RadioBtn;
