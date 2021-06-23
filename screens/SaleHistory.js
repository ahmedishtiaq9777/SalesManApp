import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import LocalStorage from '../api/storagecontroller';
import ApiController from '../api/apicontroller';
import Moment from 'moment';
import Saleitem from '../components/saleitem';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {Searchbar} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import InternetError from '../components/InternetError';

const SaleHistory = ({navigation}) => {
  localstorage = new LocalStorage();
  api = new ApiController();
  const [Osales, SetOsales] = useState([]);
  const [sales, setSales] = useState([]);
  const [saledetails, setSaleDetails] = useState([]);
  const [fromdate, setfromdate] = useState(new Date());
  const [Todate, setTodate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  const [errorvisible, seterrorvisible] = useState(false);

  const getdata = async () => {
    let salesmanid = await localstorage.getLoginpref();
    let result = await api.getsaleofSaleman(salesmanid);
    let result2 = await api.getsaledetailofSaleman(salesmanid);

    console.log('responce:', result);
    console.log('responce 2:', result2);
    SetOsales(result);
    //  setSales(result);
    filterSales(result);
    setSaleDetails(result2);
    /*
    console.log('billDate:', typeof result[0].billDate);
    var date = new Date(result[0].billDate);
    console.log('billdateformet:', date.toUTCString());
    Moment.locale('en');
    console.log(
      'billdaterealformet:',
      Moment(result[0].billDate).format('MM/DD/YYYY'),
    );*/
  };

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        getdata();
      } else {
        seterrorvisible(t => !t);
      }
    });

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
    filterSales(Osales);
  }, [fromdate]);
  useEffect(() => {
    console.log('ToDateChanged');
    filterSales(Osales);
  }, [Todate]);

  const filterSales = list => {
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
    setSales(filterresponce);
  };
  const getdatevisefilteredsales = () => {
    let filterresponce = Osales.filter(checkdate);
    return filterresponce;
  };
  const checkdate = item => {
    //console.log(Moment(fromdate).format('YYYY/MM/DD'));
    let tfromdate = Moment(fromdate).format('YYYY/MM/DD');
    let tTodate = Moment(Todate).format('YYYY/MM/DD');
    let itemdate = Moment(item.billDate).format('YYYY/MM/DD');
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

  const onChangeSearch = query => {
    console.log(query);
    let datevisefilter = getdatevisefilteredsales();
    if (query.trim() !== '') {
      // setSearchQuery(query);
      let tquery = query.trim();

      // let tshops=[...shopkeepers];
      let filterrrsales = datevisefilter.filter(
        a =>
          a.name.toLowerCase().includes(tquery.toLowerCase()) ||
          a.billNo.toLowerCase().includes(tquery.toLowerCase()),
      );
      /*
      if (filterrrecoveries.length > 0) {
        console.log('Greater..........................');
        let Ttotal = filterrlogs.reduce(Total_Reducer, 0);
        SetTotal(Ttotal);
      } else {
        SetTotal(0);
      }*/

      setSales(filterrrsales);

      // Setshopkeepers(tshops);
    } else {
      setSales(datevisefilter);
      // Setshopkeepers(shopkeepers_orignal);
    }
  };

  const rendersaleitem = ({item, index}) => {
    return <Saleitem item={item} index={index} onclick={onsaleitemclick} />;
  };
  const onsaleitemclick = (billno, grandtotal, name) => {
    let filteredsaledetail = saledetails.filter(a => a.billno === billno);
    console.log('filteredsaledetail:', filteredsaledetail);
    console.log('billno:', billno.trim());
    console.log('grandtotal,', grandtotal);
    console.log('name', name);
    let strsaledetail = JSON.stringify(filteredsaledetail);
    console.log('typof:', typeof strsaledetail);
    navigation.navigate('saledetail', {
      grandtotal: grandtotal,
      saledetails: strsaledetail,

      name: name,
    });
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
    <>
      <InternetError visible={errorvisible} onRetry={Retry} />
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
          style={{marginBottom: 10}}
          placeholder="Search for Shopkeeper"
          onChangeText={onChangeSearch}
        />

        <View style={{flexDirection: 'row', marginLeft: 5, marginTop: 7}}>
          <Text style={styles.header}>BillNo</Text>

          <Text style={styles.header}>BillDate</Text>
          <Text style={styles.header}>Shopkeeper</Text>
          <Text style={styles.headergrandtotal}>GrandTotal</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <FlatList
            data={sales}
            renderItem={rendersaleitem}
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default SaleHistory;
