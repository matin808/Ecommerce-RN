import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Button, Text} from 'react-native-paper';

interface IQuantity {
  value: number;
  increment: () => void;
  decrement: () => void;
}

const Quantity = (props: IQuantity) => {
  const {value, increment, decrement} = props;
  return (
    <View style={styles.container}>
      <Button
        style={styles.btn}
        disabled={value === 0}
        mode="outlined"
        textColor="#000"
        onPress={decrement}>
        -
      </Button>

      <Text>{value}</Text>
      <Button
        style={styles.btn}
        disabled={value === 8}
        mode="outlined"
        textColor="#000"
        onPress={increment}>
        +
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    flex: 1,
    width: '100%',
    gap: 30,
  },

  btn: {
    width: '40%',
  },
});

export default Quantity;
