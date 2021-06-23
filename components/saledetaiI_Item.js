import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const SaleDetailItem = ({item, index}) => {
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
          //showdeleteConfirm(index);
        }}>
        <Text style={styles.row}>{item.containerid}</Text>

        <Text style={styles.row}>{item.itemName}</Text>
        <Text style={styles.row}>{item.price}</Text>
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

export default SaleDetailItem;
