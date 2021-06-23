import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
//import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Home = ({navigation}) => {
  const OnNewSale = () => {
    //menu.hide();
    navigation.navigate('selectshop');
  };
  const OnRecovery = () => {
    //  alert('OnRecovery');
    navigation.navigate('pendingrecoveries');
    // menu.hide();
  };
  const OnSaleHistory = () => {
    //  alert('OnSaleHistory');
    navigation.navigate('salehistory');
  };
  const OnReports = () => {
    alert('OnReports');
  };
  const OnReceivingLogs = () => {
    // alert('Logs');
    navigation.navigate('ReceivingLogs');
  };
  const hidemenu = () => {
    menu.hide();
  };
  const showmenu = () => {
    menu.show();
  };

  return (
    <View style={styles.container}>
      <View style={styles.row1}>
        <TouchableOpacity style={styles.box} onPress={OnNewSale}>
          <MaterialIcons
            name="point-of-sale"
            size={35}
            color="blue"
            style={{alignSelf: 'center'}}
          />
          <Text style={styles.boxText}>NewSale</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={OnRecovery}>
          <MaterialIcons
            name="money"
            size={35}
            style={{alignSelf: 'center'}}
            color="green"
          />
          <Text style={styles.boxText}>Recovery</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.box} onPress={OnSaleHistory}>
          <MaterialIcons
            name="history"
            size={35}
            color="#008b8b"
            style={{alignSelf: 'center'}}
          />
          <Text style={styles.boxText}>SaleHistory</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={OnReceivingLogs}>
          <MaterialIcons
            name="equalizer"
            size={35}
            style={{alignSelf: 'center'}}
            color="#9400d3"
          />
          <Text style={styles.boxText}>Receiving Logs</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}></View>

      <View style={styles.row}></View>
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
    justifyContent: 'space-around',
  },
  row1: {
    flex: 1,
    flexDirection: 'row',

    justifyContent: 'space-around',
  },
  boxText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  box: {
    width: '45%',
    marginTop: 5,

    justifyContent: 'center',
    elevation: 6,
  },
});
export default Home;
