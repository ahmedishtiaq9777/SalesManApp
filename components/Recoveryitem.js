import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Moment from 'moment';
const RecoveryItem = ({item, index}) => {
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
          // onclick(item.billNo, item.grandtotal, item.name);
          //  showdeleteConfirm(index);
        }}>
        <Text style={styles.row}>{item.billno}</Text>

        <Text style={styles.row}>
          {Moment(item.billdate).format('MM/DD/YYYY')}
        </Text>
        <Text style={styles.row}>{item.shopkeeper}</Text>
        <Text style={styles.grandtotal}>{item.total}</Text>
        <Text style={styles.remainings}>{item.remainings}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    fontSize: 11,
    fontWeight: '100',
    marginRight: 5,

    width: 60,
    height: 30,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  grandtotal: {
    fontSize: 11,
    fontWeight: '100',
    marginRight: 9,
    marginLeft: 10,
    width: 60,
    height: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  remainings: {
    fontSize: 11,
    fontWeight: '100',
    width: 60,
    height: 30,
    textAlignVertical: 'center',
  },
});

export default RecoveryItem;
