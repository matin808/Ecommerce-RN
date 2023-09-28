import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
type TOrderProps = {
  item: {
    cost: number;
    created: string;
    id: number;
  };
  onPress: (arg: any) => void;
};
const OrderList = ({item, onPress}: TOrderProps) => {
  console.log('111', item);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.dataContainer}>
          <View style={styles.dataRow}>
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.value}>{item.id}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Cost:</Text>
            <Text style={styles.value}>₹{item.cost}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{item.created}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dataContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 18,
    color: '#555',
  },
});

export default OrderList;
