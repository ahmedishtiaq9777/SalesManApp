import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Moment from 'moment';
const Logitem = ({item, index}) => {
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
          //    onclick(item.billno, item.grandtotal, item.name);
          //  showdeleteConfirm(index);
        }}>
        <Text style={styles.row}>{Moment(item.date).format('MM/DD/YYYY')}</Text>
        <Text style={styles.row}>{item.billno}</Text>

        <Text style={styles.row}>{item.shopname}</Text>
        <Text style={styles.grandtotal}>{item.receive}.Rs</Text>
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

export default Logitem;
