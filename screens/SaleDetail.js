import React from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import SaleDetailItem from '../components/saledetaiI_Item';
const SaleDetail = ({route, navigation}) => {
  const {grandtotal, saledetails, name} = route.params;
  const saledetailsjson = JSON.parse(saledetails);
  console.log('saledetail in detialscreen:', saledetailsjson);
  //console.log('typeof:', typeof saledetailsjson);

  const renderGridItems = ({item, index}) => {
    return <SaleDetailItem item={item} index={index} />;
  };

  return (
    <View style={{flex: 1}}>
      <View style={{paddingHorizontal: 100, marginBottom: 10}}>
        <Text
          style={{
            textAlign: 'center',
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderColor: '#556b2f',
            borderRadius: 10,
            fontSize: 20,
            fontWeight: 'bold',
            padding: 10,
          }}>
          {name}
        </Text>
      </View>
      <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
        <Text style={styles.header}>Container</Text>

        <Text style={styles.header}>Product</Text>
        <Text style={styles.header}>Rate</Text>
        <Text style={styles.header}>Qty</Text>
        <Text style={styles.header}>Total</Text>
      </View>
      {
        <View style={{flex: 1, flexDirection: 'row'}}>
          {
            <FlatList
              data={saledetailsjson}
              renderItem={renderGridItems}
              keyExtractor={(item, index) => index}
            />
          }
        </View>
      }
      <View style={styles.totalview}>
        <Text style={styles.totalViewText}>GrandTotal:</Text>
        <Text style={styles.totalViewText}>{grandtotal}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    fontSize: 11,
    fontWeight: 'bold',
    marginRight: 5,

    width: 70,
    height: 30,
  },
  totalview: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  totalViewText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  paymentView: {
    flex: 0.2,
    alignItems: 'center',
  },
  paymentViewbutton: {
    backgroundColor: 'lightgreen',
    height: 40,
    paddingHorizontal: 30,
    justifyContent: 'center',
    borderRadius: 10,
    paddingBottom: 2,
  },
});

export default SaleDetail;
