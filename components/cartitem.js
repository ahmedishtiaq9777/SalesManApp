import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const CartItem = ({item, index, showdeleteConfirm}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          backgroundColor: 'lightgreen',
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        onLongPress={() => {
          console.log('Key:', index);
          showdeleteConfirm(index);
        }}>
        <Text style={styles.row}>{item.containerid}</Text>

        <Text style={styles.row}>{item.itemname}</Text>
        <Text style={styles.row}>{item.rate}</Text>
        <Text style={styles.row}>{item.qty}</Text>
        <Text style={styles.row}>{item.total}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    fontSize: 11,
    fontWeight: '100',
    marginRight: 5,

    width: 70,
    height: 30,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
});

export default CartItem;
