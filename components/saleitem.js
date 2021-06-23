import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Moment from 'moment';
const Saleitem = ({item, index, onclick}) => {
  return (
    <View style={{flexDirection: 'row', marginLeft: 5, marginTop: 5}}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          backgroundColor: 'lightgreen',
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        onPress={() => {
          console.log('Key:', index);
          onclick(item.billNo, item.grandtotal, item.name);
          //  showdeleteConfirm(index);
        }}>
        <Text style={styles.row}>{item.billNo}</Text>

        <Text style={styles.row}>
          {Moment(item.billDate).format('MM/DD/YYYY')}
        </Text>
        <Text style={styles.row}>{item.name}</Text>
        <Text style={styles.grandtotal}>{item.grandtotal}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    fontSize: 11,
    fontWeight: '100',
    marginRight: 5,

    width: 80,
    height: 30,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  grandtotal: {
    fontSize: 11,
    fontWeight: '100',
    marginRight: 5,
    width: 70,
    height: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default Saleitem;
