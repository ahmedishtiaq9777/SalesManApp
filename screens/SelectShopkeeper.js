import React, {useEffect, useState} from 'react';
import instance from '../api/axios';
import {
  View,
  ActivityIndicator,
  Text,
  FlatList,
  Keyboard,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ShopsGrid from '../components/ShopGrid';
import {Searchbar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';
import InternetError from '../components/InternetError';

const ViewDetailCard = ({
  visible,
  visibilityhandler,
  selectedShopkeeper,
  navigation,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={() => visibilityhandler()}>
      <View style={styles.row1}></View>
      <View style={styles.middlerow}>
        <MaterialIcons
          name="close"
          size={25}
          onPress={() => {
            visibilityhandler();
          }}
        />
        <View style={{flex: 1, justifyContent: 'center', marginBottom: 30}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log('selected Shopkeeper:', selectedShopkeeper);
              visibilityhandler();
              navigation.navigate('Shopdetails', {item: selectedShopkeeper});
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row3}></View>
    </Modal>
  );
};

const SelectShopkeeper = ({navigation}) => {
  const [shopkeepers, Setshopkeepers] = useState([]);
  const [shopkeepers_orignal, SetOrignalShopkeepers] = useState([]);
  const [loading, setloading] = useState(false);
  //const [searchQuery, setSearchQuery] = useState('');
  const [ViewDetailCardvisibile, Setvisibility] = useState(false);
  const [selectedShopkeeper, setSelectedShopkeeper] = useState('');

  const [errorvisible, seterrorvisible] = useState(false);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        loadshopkeepers();
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

  const loadshopkeepers = async () => {
    setloading(true);
    let responce = await instance.get('/Api/GetShopkeepers');
    console.log('responce:', responce.data);
    Setshopkeepers(responce.data);
    SetOrignalShopkeepers(responce.data);
    setloading(false);
  };
  const renderGridItems = ({item}) => {
    return (
      <ShopsGrid
        item={item}
        onGridpress={onShopSelected}
        visibilityhandler={visibilityhandler}
        OnLondPressCard={onPressDetail}
      />
    );
  };
  const onShopSelected = item => {
    //alert('shop', item);
    // console.log('shopname', item);
    navigation.navigate('Sale', {shop: item});
  };

  const onChangeSearch = query => {
    console.log(query);
    if (query.trim() !== '') {
      // setSearchQuery(query);
      let tquery = query.trim();
      // let tshops=[...shopkeepers];
      let tshops = shopkeepers_orignal.filter(a =>
        a.name.toLowerCase().includes(tquery.toLowerCase()),
      );

      Setshopkeepers(tshops);
    } else {
      Setshopkeepers(shopkeepers_orignal);
    }
  };
  const visibilityhandler = () => {
    Setvisibility(t => !t);
  };
  const onPressDetail = item => {
    console.log('item in on selectshopkeeper', item);
    setSelectedShopkeeper(item);
    Setvisibility(t => !t);
  };
  const Retry = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        seterrorvisible(t => !t);
        loadshopkeepers();
      }
    });
  };

  return (
    <>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <View>
          <ViewDetailCard
            visible={ViewDetailCardvisibile}
            visibilityhandler={visibilityhandler}
            selectedShopkeeper={selectedShopkeeper}
            navigation={navigation}
          />
          <InternetError visible={errorvisible} onRetry={Retry} />
          <Searchbar
            placeholder="Search for Shopkeeper"
            onChangeText={onChangeSearch}
          />
          <FlatList
            data={shopkeepers}
            renderItem={renderGridItems}
            numColumns={2}
            keyExtractor={(item, index) => item.shopId}
          />
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  row1: {
    flex: 0.8,
  },
  middlerow: {
    flex: 1,
    backgroundColor: '#f0ffff',
    marginHorizontal: 40,
    justifyContent: 'center',
    elevation: 6,
    borderRadius: 10,
  },
  row3: {
    flex: 1.5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'pink',
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 20,
  },
});
export default SelectShopkeeper;
