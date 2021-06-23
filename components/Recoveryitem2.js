import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Moment from 'moment';

const Recoveryitem2 = ({item, index, itempress}) => {
  const onPress = () => {
    itempress(item);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <MaterialIcons
        name="account-circle"
        size={87}
        style={{alignSelf: 'center'}}
      />
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={styles.shopname_date}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15}}>
            {item.shopkeeper}
          </Text>
          <Text style={{flex: 1, textAlign: 'right'}}>
            {Moment(item.billdate).format('MM/DD/YYYY')}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={{borderBottomWidth: 1}}>#{item.billno}</Text>
        </View>
        {/*
        <View style={styles.row}>
          <MaterialIcons name="calendar-today" size={20} />
          <Text style={{marginLeft: 20, textAlignVertical: 'center'}}>
            {Moment(item.billdate).format('MM/DD/YYYY')}
          </Text>
        </View>
      */}
        <View style={styles.row}>
          <Text style={{fontSize: 14}}>Total:</Text>
          <Text style={{marginLeft: 20, fontSize: 14}}>{item.total}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{fontSize: 14}}>Remainings:</Text>
          <Text style={{marginLeft: 20, fontSize: 14}}>{item.remainings}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',

    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  shopname_date: {
    flexDirection: 'row',
    marginLeft: 10,
  },
});

export default Recoveryitem2;
