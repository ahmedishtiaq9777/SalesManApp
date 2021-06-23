import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import Moment from 'moment';
import EnterReceiving from '../components/EnterReceivingAmount';
import Localstorage from '../api/storagecontroller';
import ApiController from '../api/apicontroller';
const ReceivingForm = ({navigation, route}) => {
  const [receiving, setvisibility] = useState(false);
  const {item} = route.params;
  console.log('iteminreceving:', item);
  localstorage = new Localstorage();
  api = new ApiController();

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);
  const _keyboardDidHide = () => {
    Keyboard.dismiss();
  };

  const receivingmodalvisibilityhandler = () => {
    //getCurrentdatestr();
    setvisibility(t => !t);
  };
  const getCurrentdatestr = () => {
    let strdate = Moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
    console.log('curdate:', strdate);
    console.log('type:', typeof strdate);
    return strdate;
  };
  const finalizeReceiving = async amount => {
    if (amount <= item.remainings) {
      console.log('amount:', amount);
      console.log('type is :', typeof amount);
      let strdate = getCurrentdatestr();
      let salesmanId = await localstorage.getLoginpref();
      let responce = await api.billviseReceiving(
        item,
        salesmanId,
        amount,
        strdate,
      );
      console.log('result:', responce);
      if (responce.result === 'Done') {
        alert('Amount is Received');
        receivingmodalvisibilityhandler();
        navigation.navigate('Home');
      }
    } else {
      alert('Amount Exceeds from Remaining');
    }
  };
  return (
    <View style={styles.container}>
      <EnterReceiving
        visible={receiving}
        visibilityhandler={receivingmodalvisibilityhandler}
        AfterReceiving={finalizeReceiving}
      />

      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            textAlign: 'center',

            fontSize: 20,
            fontWeight: 'bold',
            paddingVertical: 8,
            paddingHorizontal: 17,
            borderBottomWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderRadius: 10,
          }}>
          {item.shopkeeper}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',

          marginTop: 30,
        }}>
        <Text style={styles.rowheader}>BillNo:</Text>
        <Text style={styles.rowelement}>{item.billno}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowheader}>BillDate</Text>
        <Text style={styles.rowelement}>
          {Moment(item.billdate).format('MM/DD/YYYY')}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowheader}>Total</Text>
        <Text style={styles.rowelement}>{item.total}.Rs</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowheader}>Remainings</Text>
        <Text style={styles.rowelement}>{item.remainings}.RS</Text>
      </View>
      <View style={styles.receiveView}>
        <TouchableOpacity
          style={styles.receivebtn}
          onPress={receivingmodalvisibilityhandler}>
          <Text style={styles.btntxt}>RECEIVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  rowheader: {
    fontSize: 20,
    fontWeight: 'bold',

    flex: 1,
    textAlign: 'center',
  },
  rowelement: {
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',

    flex: 1,
  },
  receiveView: {
    flex: 1.3,
    alignItems: 'center',

    justifyContent: 'center',
  },
  receivebtn: {
    backgroundColor: '#00bfff',
    marginBottom: 10,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btntxt: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ReceivingForm;
