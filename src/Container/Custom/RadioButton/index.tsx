import React, {useMemo} from 'react';
import {colors} from '../../../assets/colors/Colors';
import {RadioGroup} from 'react-native-radio-buttons-group';

interface IRadioBtn {
  handleChange: (arg: any) => void;
  data: string;
}

const RadioBtn = (props: IRadioBtn) => {
  const {handleChange, data} = props;
  const radioButtons = useMemo(
    () => [
      {
        id: 'M',
        label: 'Male',
        color: colors.ACTIONCOLOR,
      },
      {
        id: 'F',
        label: 'Female',
        color: colors.ACTIONCOLOR,
      },
    ],
    [],
  );
  return (
    <RadioGroup
      layout="row"
      radioButtons={radioButtons}
      onPress={t => handleChange(t)}
      selectedId={data}
    />
  );
};

export default RadioBtn;
