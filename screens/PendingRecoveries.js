import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
//import RecoveryItem from '../components/Recoveryitem';
import Recoveryitem2 from '../components/Recoveryitem2';
import ApiController from '../api/apicontroller';
import LocalStorage from '../api/storagecontroller';
import NetInfo from '@react-native-community/netinfo';
import Moment from 'moment';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {Searchbar} from 'react-native-paper';
import InternetError from '../components/InternetError';
const PendingRecoveries = ({navigation}) => {
  api = new ApiController();
  localstorage = new LocalStorage();

  const [pendingrecoveries, setRecoveries] = useState([]);
  const [Opendingrecoveries, setOpendingrecoveries] = useState([]);
  const [fromdate, setfromdate] = useState(new Date());
  const [Todate, setTodate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  const [errorvisible, seterrorvisible] = useState(false);

  const getdata = async () => {
    let salemanId = await localstorage.getLoginpref();
    let result = await api.getremainingRecoveryofSaleman(salemanId);
    console.log('result:', result);
    setOpendingrecoveries(result);
    //setRecoveries(result);
    filterRecoveries(result);
  };

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        getdata();
      } else {
        seterrorvisible(t => !t);
      }
    });
    //getdata();

    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidHide = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    console.log('Fromdatechanged');
    filterRecoveries(Opendingrecoveries);
  }, [fromdate]);
  useEffect(() => {
    console.log('ToDateChanged');
    filterRecoveries(Opendingrecoveries);
  }, [Todate]);

  const filterRecoveries = list => {
    console.log('llllist:', list);
    let filterresponce = list.filter(checkdate);
    console.log('filtered:', filterresponce);
    /* if (filterresponce.length > 0) {
      console.log('Greater..........................');
      let Ttotal = filterresponce.reduce(Total_Reducer, 0);
      SetTotal(Ttotal);
    } else {
      SetTotal(0);
    }*/
    //setSales(filterresponce);
    setRecoveries(filterresponce);
  };
  const getdatevisefilterRecoveries = () => {
    let filterresponce = Opendingrecoveries.filter(checkdate);
    return filterresponce;
  };
  const checkdate = item => {
    //console.log(Moment(fromdate).format('YYYY/MM/DD'));
    let tfromdate = Moment(fromdate).format('YYYY/MM/DD');
    let tTodate = Moment(Todate).format('YYYY/MM/DD');
    let itemdate = Moment(item.billdate).format('YYYY/MM/DD');
    console.log('from date:', tfromdate);
    console.log('ToDate:', tTodate);
    console.log('itemdate:', itemdate);

    if (Moment(itemdate).isBetween(tfromdate, tTodate, undefined, '[]')) {
      console.log('True');
      return item;
    }
  };

  const onFromdatechange = (event, selectedDate) => {
    const currentDate = selectedDate || fromdate;
    setShowFrom(Platform.OS === 'ios');
    setfromdate(currentDate);
    console.log('selected  from date:', selectedDate);
    // filterLogs(Ologs);
  };
  const onTodatechange = (event, selectedDate) => {
    const currentDate = selectedDate || Todate;
    setShowTo(Platform.OS === 'ios');
    setTodate(currentDate);
    console.log('selected  To date:', selectedDate);
    //filterLogs()
  };

  const showFrompicker = () => {
    setShowFrom(true);
  };
  const showToPicker = () => {
    setShowTo(true);
  };

  const renderRecoveryitem = ({item, index}) => {
    return <Recoveryitem2 item={item} index={index} itempress={onitemPress} />;
  };
  const onitemPress = item => {
    console.log('item:', item);
    navigation.navigate('Receiving', {item: item});
  };

  const onChangeSearch = query => {
    console.log(query);
    let datevisefilter = getdatevisefilterRecoveries();
    if (query.trim() !== '') {
      // setSearchQuery(query);
      let tquery = query.trim();

      // let tshops=[...shopkeepers];
      let filterrrecoveries = datevisefilter.filter(
        a =>
          a.shopkeeper.toLowerCase().includes(tquery.toLowerCase()) ||
          a.billno.toLowerCase().includes(tquery.toLowerCase()),
      );
      /*
      if (filterrrecoveries.length > 0) {
        console.log('Greater..........................');
        let Ttotal = filterrlogs.reduce(Total_Reducer, 0);
        SetTotal(Ttotal);
      } else {
        SetTotal(0);
      }*/

      setRecoveries(filterrrecoveries);

      // Setshopkeepers(tshops);
    } else {
      setRecoveries(datevisefilter);
      // Setshopkeepers(shopkeepers_orignal);
    }
  };
  const Retry = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        seterrorvisible(t => !t);
        getdata();
      }
    });
  };

  return (
    <View style={styles.container}>
      {/*<View style={{flexDirection: 'row', marginTop: 7}}>
        <Text style={styles.header}>BillNo</Text>

        <Text style={styles.header}>BillDate</Text>
        <Text style={styles.header}>Shopkeeper</Text>
        <Text style={styles.total}>Total</Text>

        <Text style={styles.remainings}>Remainings</Text>
      </View>
      */}
      <InternetError visible={errorvisible} onRetry={Retry} />
      <View style={{flex: 0.17, flexDirection: 'row'}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.datetitle}>FromDate</Text>
          <TouchableOpacity style={styles.date} onPress={showFrompicker}>
            <Text style={styles.datetext}>
              {Moment(fromdate).format('MM/DD/YYYY')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.datetitle}>To Date</Text>
          <TouchableOpacity style={styles.date} onPress={showToPicker}>
            <Text style={styles.datetext}>
              {Moment(Todate).format('MM/DD/YYYY')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Searchbar
        style={{marginBottom: 10}}
        placeholder="Search for Shopkeeper"
        onChangeText={onChangeSearch}
      />

      <View style={{flex: 1, flexDirection: 'row', marginBottom: 5}}>
        <FlatList
          data={pendingrecoveries}
          renderItem={renderRecoveryitem}
          keyExtractor={(item, index) => index}
        />
      </View>
      {showFrom && (
        <RNDateTimePicker
          mode={mode}
          testID="dateTimePicker"
          value={fromdate}
          is24Hour={true}
          display="default"
          onChange={onFromdatechange}
        />
      )}

      {showTo && (
        <RNDateTimePicker
          mode={mode}
          testID="dateTimePicker"
          value={Todate}
          is24Hour={true}
          display="default"
          onChange={onTodatechange}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 11,
    fontWeight: 'bold',
    marginRight: 5,

    width: 60,
    height: 30,
  },
  remainings: {
    fontSize: 11,
    fontWeight: 'bold',

    width: 60,
    height: 30,
  },
  total: {
    fontSize: 11,
    fontWeight: 'bold',
    marginRight: 9,
    marginLeft: 10,
    width: 40,
    height: 30,
  },
  date: {
    marginTop: 10,
    paddingHorizontal: 20,
    backgroundColor: 'green',
  },
  datetext: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  datetitle: {
    fontSize: 17,
    fontWeight: '800',
  },
});

export default PendingRecoveries;
