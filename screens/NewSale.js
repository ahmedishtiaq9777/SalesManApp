import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {Button, Snackbar} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import instance from '../api/axios';
import ApiController from '../api/apicontroller';
import LocalStorage from '../api/storagecontroller';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CartModal from '../components/cartmodal';
import NetInfo from '@react-native-community/netinfo';
import GetCurDate from '../components/getCurDate';
import InternetError from '../components/InternetError';
//import {set} from 'react-native-reanimated';
const NewSale = ({navigation, route}) => {
  apicontroller = new ApiController();
  localstorage = new LocalStorage();
  const [selectedshopkeeper, setShopkeeper] = useState(0);
  const [selectedContainer, setContainer] = useState(null);
  const [qty, setqty] = useState(null);
  //const [shopkeepers, Setshopkeepers] = useState([]);
  const [Containers, SetContainers] = useState([]);
  const [product, setprooduct] = useState('');
  const [orignalsalerate, SetOrate] = useState(0);
  const [productremaining, setproremaining] = useState(0);
  const [loading, setloading] = useState(false);
  const [total, settotal] = useState(0);
  const [saleitems, SetSaleitems] = useState([]);
  const [grandtotal, setGrandtotal] = useState(0);
  const [cartvisible, setvisibility] = useState(false);
  const [snakbarvisible, setsnakvisible] = useState(false);
  const [rate, setRate] = useState(0);
  const [displayrate, setdisrate] = useState(0);

  const [errorvisible, seterrorvisible] = useState(false);

  // let rateinputref;
  //let shop = shopkeepers.find(a => a.shopId === selectedshopkeeper);
  //console.log('shop', shop);
  const {shop} = route.params;
  //  console.log('shopname:', shop.name);
  if (Containers.length > 0) {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: 'green',
              textAlign: 'right',
              fontSize: 11,

              width: 90,
            }}>
            {shop.name}
          </Text>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                textAlign: 'center',
                marginLeft: -10,
                color: 'red',
              }}>
              {saleitems.length}
            </Text>
            <MaterialIcons
              name="shopping-basket"
              size={25}
              style={{
                marginRight: 13,
                color: 'black',
                borderWidth: 1,
                borderRadius: 5,
              }}
              onPress={visibilityhandler}
            />
          </View>
        </View>
      ),
    });
  }

  console.log('shopkeeper:', selectedshopkeeper);
  console.log('selectedContainer:', selectedContainer);
  //console.log('shopkeepers:', shopkeepers);

  console.log('total:', total);
  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        loadcontainers();
      } else {
        seterrorvisible(t => !t);
      }
    });

    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };

    // loadshopkeepers();
  }, []);

  const _keyboardDidHide = () => {
    Keyboard.dismiss();
  };
  const loadshopkeepers = async () => {
    let responce = await instance.get('/Api/GetShopkeepers');
    Setshopkeepers(responce.data);
  };
  const loadcontainers = async () => {
    setloading(true);
    let responce = await instance.get('/Api/GetContainers');
    SetContainers(responce.data);
    setloading(false);
  };
  const onContainerSelected = async (value, index) => {
    let temp = saleitems.filter(a => a.containerid === value);
    console.log('temp:', temp);
    let exis_qty = 0;
    if (temp.length > 0) {
      exis_qty = temp.reduce((prev, next) => prev + next.qty, 0);
      console.log('exiting qty:', exis_qty);
    }
    setContainer(value);
    console.log('container:', value);
    let prod = {};
    if (index != 0) prod = await apicontroller.getproductofContainer(value);

    console.log('prod:', prod);
    if (rate > 0) {
      prod.saleRate = rate;
    } else {
      if (prod != null) {
        console.log('kkkk');
        setdisrate(prod.saleRate);
        SetOrate(prod.saleRate);
        //setRate(prod.saleRate);
        //  rateinputref.value;
      }
    }
    setprooduct(prod);
    if (temp.length > 0) {
      let tempremainqty = prod.remainingQty - exis_qty;
      setproremaining(tempremainqty);
    } else {
      setproremaining(prod.remainingQty);
    }
    // setproremaining(pr)
    let Temptotal = prod.saleRate * qty;
    settotal(Temptotal);
    console.log('oncontainerselected:', value.trim());
    console.log('oncontainerSelected:Prod:', prod);
  };
  const onChangeRate = value => {
    console.log('rate:', value);
    setRate(value);
    setdisrate(value);

    let prod = {...product};
    if (value > 0) {
      prod.saleRate = value;
    } else {
      prod.saleRate = orignalsalerate;
    }
    setprooduct(prod);

    if (qty > 0) {
      let Temptotal = prod.saleRate * qty;
      settotal(Temptotal);
    } else {
    }
  };
  const onChangeQty = value => {
    setqty(value);
    let Temptotal = product.saleRate * value;
    settotal(Temptotal);
  };
  const onSalepressed = async () => {
    if (
      selectedContainer != null &&
      selectedContainer.trim() != 'Select Container' &&
      qty != 0 &&
      qty !== null &&
      qty <= productremaining &&
      total > 0
    ) {
      //saleitems.find(a=>a.containerid===)
      let salesmanId = await localstorage.getLoginpref();
      //let sigleshop = shopkeepers.find(a => a.shopId === selectedshopkeeper);
      //////
      let remainingQty = productremaining - qty;
      setproremaining(remainingQty);
      /////
      let item = {
        shopkeeper: shop.shopId,
        shopname: shop.name,
        containerid: selectedContainer,
        itemcode: product.itemCode,
        itemname: product.itemName,
        itemunit: product.itemUnit,
        itemunitname: product.itemUnitstr,
        rate: product.saleRate,
        qty: parseInt(qty),
        salesman: salesmanId,
        total: total,
      };
      let tempsales = [...saleitems];
      if (saleitems.length > 0) {
        tempsales.push(item);
        SetSaleitems(tempsales);
      } else {
        tempsales.push(item);
        SetSaleitems(tempsales);
      }

      let Tgrandtotal = tempsales.reduce((prev, next) => prev + next.total, 0);
      setGrandtotal(Tgrandtotal);
      console.log('item:', item);
      console.log('iems:', tempsales);
      console.log('saleitems:', saleitems);
      setsnakvisible(true);
    }
  };
  const finalizeSale = recevingamount => {
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.isConnected === true) {
        console.log('received', recevingamount);
        let currdate = GetCurDate();
        console.log('currdate:', currdate);

        // let strsaleitems = JSON.stringify(saleitems);
        let parameters = {
          salelist: saleitems,
          Grandtotal: grandtotal,
          receiving: recevingamount,
          curdate: currdate,
        };
        let strparams = JSON.stringify(parameters);
        console.log('final params: ', strparams);
        instance
          .post('/Api/SaveSale', {parameters: strparams})
          .then(responce => {
            console.log('responce:', responce.data);
            if (responce.data.result == 'success') {
              //alert('Sale Done');

              Alert.alert('Done', 'Your Sale is Done', [
                {
                  text: 'OK',
                  onPress: () => {
                    console.log('OK Pressed');
                    navigation.navigate('Home');
                  },
                },
              ]);

              //  visibilityhandler();
            }
          })
          .catch(error => console.log(error));
      } else {
        alert('Please Check Your Internet Connection');
      }
    });
  };
  const ondeleteItem = index => {
    let tempsales = [...saleitems];
    tempsales.splice(index, 1);

    let Tgrandtotal = tempsales.reduce((prev, next) => prev + next.total, 0);
    setGrandtotal(Tgrandtotal);

    SetSaleitems(tempsales);
    console.log('delete in NewSale:index ', index);
  };
  const visibilityhandler = () => {
    setvisibility(t => !t);
  };
  const Retry = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        seterrorvisible(t => !t);
        loadcontainers();
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
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <CartModal
            visible={cartvisible}
            visibilityhandler={visibilityhandler}
            saleitems={saleitems}
            shop={shop}
            ondeleteItem={ondeleteItem}
            grandtotal={grandtotal}
            finalizeSale={finalizeSale}
          />
          <InternetError visible={errorvisible} onRetry={Retry} />
          <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
            accessible={false}
            style={{backgroundColor: 'black'}}>
            <View style={styles.container}>
              <View
                style={{
                  flex: 2.7,
                }}>
                <View style={styles.shopname}>
                  <Text style={styles.shopnametext}>{shop.name}</Text>
                </View>
                <View
                  style={{
                    flex: 0.9,
                    marginBottom: 10,
                    flexDirection: 'row',
                  }}>
                  <View style={styles.cardlabel}>
                    <Text
                      style={{
                        textAlignVertical: 'center',

                        fontSize: 17,
                        fontWeight: 'bold',
                      }}>
                      Select Container:
                    </Text>
                  </View>
                  <View style={styles.card}>
                    <Picker
                      selectedValue={selectedContainer}
                      onValueChange={(value, index) =>
                        onContainerSelected(value, index)
                      }>
                      {Containers.map((item, index) => (
                        <Picker.Item label={item} value={item} key={index} />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View
                  style={{
                    flex: 0.9,
                    marginBottom: 10,
                    flexDirection: 'row',
                  }}>
                  <View style={styles.cardlabel}>
                    <Text
                      style={{
                        textAlignVertical: 'center',

                        fontSize: 17,
                        fontWeight: 'bold',
                      }}>
                      Rate:
                    </Text>
                  </View>
                  <View style={styles.card}>
                    <TextInput
                      value={displayrate > 0 ? displayrate.toString() : ''}
                      onChangeText={onChangeRate}
                      selectedValue={rate}
                      placeholder="Rate"
                      keyboardType="numeric"
                      style={{
                        alignSelf: 'center',
                        fontSize: 18,
                        paddingHorizontal: 20,

                        width: '80%',
                        textAlign: 'center',
                      }}
                    />
                  </View>
                </View>
                {selectedContainer != null ? (
                  <>
                    <View
                      style={{
                        flex: 0.5,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: 30,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          paddingRight: 50,
                        }}>
                        Product Name
                      </Text>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                        {product.itemName}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.4,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <Text style={{marginLeft: -30}}>Remaining Items</Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                          textAlign: 'right',
                        }}>
                        {productremaining}
                      </Text>
                    </View>
                  </>
                ) : (
                  <Text></Text>
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flex: 1,

                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      flex: 1,
                      height: 50,
                      textAlignVertical: 'center',
                      textAlign: 'center',
                    }}>
                    Unit:{'  '}
                    <Text style={{fontWeight: 'bold'}}>
                      {product.itemUnitstr}
                    </Text>
                  </Text>
                  <TextInput
                    style={{
                      flex: 1,
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#a52a2a',
                      borderRadius: 20,
                      marginHorizontal: 10,
                      textAlign: 'center',
                    }}
                    selectedValue={qty}
                    keyboardType="numeric"
                    onChangeText={onChangeQty}
                    placeholder="Quantity"
                  />
                </View>
                {Number.isNaN(total) ? null : total == 0 ? null : (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      marginTop: 20,

                      borderColor: 'pink',
                      justifyContent: 'center',
                      paddingHorizontal: 10,
                    }}>
                    <Text>Total: </Text>
                    <Text>
                      {product.saleRate}x{qty}= {total}
                    </Text>
                  </View>
                )}
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#008b8b',
                      alignItems: 'center',
                      marginHorizontal: 30,
                      borderRadius: 20,
                      height: 30,
                    }}
                    onPress={onSalepressed}>
                    <Text style={{fontSize: 20, alignItems: 'center'}}>
                      Sale
                    </Text>
                  </TouchableOpacity>
                </View>
                <Snackbar
                  visible={snakbarvisible}
                  onDismiss={() => {
                    console.log('dismiss bar');

                    setsnakvisible(false);
                  }}
                  action={{
                    label: 'Ok',
                    onPress: () => {
                      // Do something
                      setsnakvisible(false);
                    },
                  }}>
                  Added to Sale Cart
                </Snackbar>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderWidth: 1,
    borderRadius: 20,
    width: '56%',
    height: 50,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 10,
  },
  cardlabel: {
    width: '37%',
    height: 50,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 10,

    justifyContent: 'center',
  },
  shopname: {
    alignItems: 'center',
    flex: 0.6,
  },
  shopnametext: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: 'green',
    paddingHorizontal: 15,
  },
});

export default NewSale;
