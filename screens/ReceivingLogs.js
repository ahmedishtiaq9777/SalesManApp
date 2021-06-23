import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
//import {Checkbox} from 'react-native-paper';
import LocalStorage from '../api/storagecontroller';
import ApiController from '../api/apicontroller';
import Logitem from '../components/logitem';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {Searchbar} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import Moment from 'moment';
import InternetError from '../components/InternetError';
const ReceivingLogs = () => {
  localstorage = new LocalStorage();
  api = new ApiController();
  const [Logs, setLogs] = useState([]);
  const [Ologs, setOlogs] = useState([]);
  const [loader, setloadingvisibility] = useState(false);
  const [errorvisible, seterrorvisible] = useState(false);

  const [fromdate, setfromdate] = useState(new Date());
  const [Todate, setTodate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [totalReceiving, SetTotal] = useState(0);

  const getdata = async () => {
    setloadingvisibility(true);
    let salesmanId = await localstorage.getLoginpref();
    console.log('salesmanid', salesmanId);
    let responce = await api.getReceivingLogsofSalesman(salesmanId);
    if (responce.result === 'done') {
      setloadingvisibility(false);
      setOlogs(responce.list);
      filterLogs(responce.list);
    }
    console.log('responce:', responce);
  };

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        getdata();
      } else {
        seterrorvisible(t => !t);
      }
    });
    // getdata();

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
    filterLogs(Ologs);
  }, [fromdate]);
  useEffect(() => {
    console.log('ToDateChanged');
    filterLogs(Ologs);
  }, [Todate]);

  const filterLogs = list => {
    console.log('llllist:', list);
    let filterresponce = list.filter(checkdate);
    console.log('filtered:', filterresponce);
    if (filterresponce.length > 0) {
      console.log('Greater..........................');
      let Ttotal = filterresponce.reduce(Total_Reducer, 0);
      SetTotal(Ttotal);
    } else {
      SetTotal(0);
    }
    setLogs(filterresponce);
  };

  const GetdatevisefilterLogs = () => {
    // console.log('llllist:', list);
    let filterresponce = Ologs.filter(checkdate);
    console.log('filtered:', filterresponce);
    /* if (filterresponce.length > 0) {
      console.log('Greater..........................');
      let Ttotal = filterresponce.reduce(Total_Reducer, 0);
      SetTotal(Ttotal);
    } else {
      SetTotal(0);
    }
    setLogs(filterresponce);
    */
    return filterresponce;
  };
  const checkdate = item => {
    //console.log(Moment(fromdate).format('YYYY/MM/DD'));
    let tfromdate = Moment(fromdate).format('YYYY/MM/DD');
    let tTodate = Moment(Todate).format('YYYY/MM/DD');
    let itemdate = Moment(item.date).format('YYYY/MM/DD');
    console.log('from date:', tfromdate);
    console.log('ToDate:', tTodate);
    console.log('itemdate:', itemdate);

    if (Moment(itemdate).isBetween(tfromdate, tTodate, undefined, '[]')) {
      console.log('True');
      return item;
    }
  };
  const Total_Reducer = (first, secont) => {
    console.log('first:', first);
    console.log('second:', secont);
    return first + secont.receive;
  };
  const onFromdatechange = (event, selectedDate) => {
    const currentDate = selectedDate || fromdate;
    setShowFrom(Platform.OS === 'ios');
    setfromdate(currentDate);
    // filterLogs(Ologs);
  };
  const onTodatechange = (event, selectedDate) => {
    const currentDate = selectedDate || Todate;
    setShowTo(Platform.OS === 'ios');
    setTodate(currentDate);
    //filterLogs()
  };

  const showFrompicker = () => {
    setShowFrom(true);
  };
  const showToPicker = () => {
    setShowTo(true);
  };

  const onChangeSearch = query => {
    console.log(query);
    let datevisefilter = GetdatevisefilterLogs();
    if (query.trim() !== '') {
      // setSearchQuery(query);
      let tquery = query.trim();

      // let tshops=[...shopkeepers];
      let filterrlogs = datevisefilter.filter(
        a =>
          a.shopname.toLowerCase().includes(tquery.toLowerCase()) ||
          a.billno.toLowerCase().includes(tquery.toLowerCase()),
      );

      if (filterrlogs.length > 0) {
        console.log('Greater..........................');
        let Ttotal = filterrlogs.reduce(Total_Reducer, 0);
        SetTotal(Ttotal);
      } else {
        SetTotal(0);
      }

      setLogs(filterrlogs);

      // Setshopkeepers(tshops);
    } else {
      setLogs(datevisefilter);
      // Setshopkeepers(shopkeepers_orignal);
    }
  };
  const RenderLogs = ({item, index}) => {
    return <Logitem item={item} index={index} />;
  };
  const Retryconnection = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        seterrorvisible(t => !t);
        getdata();
      }
    });

    //getdata();
  };
  return (
    <>
      {loader ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <>
          <InternetError visible={errorvisible} onRetry={Retryconnection} />
          <View style={styles.container}>
            <View style={{flex: 0.2, flexDirection: 'row'}}>
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
              placeholder="Search for Shopkeeper"
              onChangeText={onChangeSearch}
            />
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 5,
                marginTop: 7,
                justifyContent: 'center',
                borderTopWidth: 1,
              }}>
              <Text style={styles.header}>BillDate</Text>

              <Text style={styles.header}>BillNo</Text>
              <Text style={styles.header}>Shopkeeper</Text>
              <Text style={styles.headergrandtotal}>ReceivedAmount</Text>
            </View>
            <View
              style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <FlatList
                data={Logs}
                renderItem={RenderLogs}
                keyExtractor={(item, index) => index}
              />
            </View>
            <View style={{flex: 0.2, flexDirection: 'row'}}>
              <Text style={styles.totaltext}>TotalReceiving:</Text>
              <Text style={styles.totalamount}>{totalReceiving}.Rs</Text>
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
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 11,
    fontWeight: 'bold',
    marginRight: 5,

    width: 80,
    height: 30,
  },
  headergrandtotal: {
    fontSize: 11,
    fontWeight: 'bold',
    marginRight: 5,
    width: 60,
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
  totaltext: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 30,
    flex: 1,
    textAlign: 'center',
  },
  totalamount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5f9ea0',
    flex: 1,
    textAlign: 'center',
  },
});

export default ReceivingLogs;
