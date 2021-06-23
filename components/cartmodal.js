import React, {useRef, useState} from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Snackbar} from 'react-native-paper';
import CartItem from './cartitem';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import EnterReceiving from './EnterReceivingAmount';
const CartModal = ({
  visible,
  visibilityhandler,
  saleitems,
  shop,
  ondeleteItem,
  grandtotal,
  finalizeSale,
}) => {
  console.log('salesitems in cart:', saleitems);
  const [confirmdelete, setconfirmdeletevisibility] = useState(false);
  const [paymentmodal, setpaymentmodalvisibility] = useState(false);
  let deleteindex = null;
  let indexref = useRef(deleteindex);
  //let grandtotal=0.0;
  //const[deleteAtIndex,SetDeleteIndex]=useState

  const renderGridItems = ({item, index}) => {
    return (
      <CartItem
        item={item}
        index={index}
        showdeleteConfirm={showdeleteConfirm}
      />
    );
  };
  const showdeleteConfirm = index => {
    console.log('showdeletesnakebar');
    indexref.current = index;
    setconfirmdeletevisibility(true);
    console.log('index in CartModal:', indexref.current);
  };
  const confirmdeletevisibilityhandler = () => {
    setconfirmdeletevisibility(v => !v);
  };
  const paymentmodalvisibilityhandler = () => {
    setpaymentmodalvisibility(v => !v);
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={() => {
        visibilityhandler();
      }}>
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
          {shop.name}
        </Text>
      </View>
      <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
        <Text style={styles.header}>Container</Text>

        <Text style={styles.header}>Product</Text>
        <Text style={styles.header}>Rate</Text>
        <Text style={styles.header}>Qty</Text>
        <Text style={styles.header}>Total</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        {
          <FlatList
            data={saleitems}
            renderItem={renderGridItems}
            keyExtractor={(item, index) => index}
          />
        }
      </View>
      <View style={styles.totalview}>
        <Text style={styles.totalViewText}>GrandTotal:</Text>
        <Text style={styles.totalViewText}>{grandtotal}</Text>
      </View>
      <View style={styles.paymentView}>
        <TouchableOpacity
          style={styles.paymentViewbutton}
          onPress={paymentmodalvisibilityhandler}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',

              textAlignVertical: 'center',
            }}>
            Payment
          </Text>
        </TouchableOpacity>
      </View>
      <ConfirmDeleteModal
        visible={confirmdelete}
        visibilityhandler={confirmdeletevisibilityhandler}
        index={indexref.current}
        ondeleteItem={ondeleteItem}
      />
      <EnterReceiving
        visible={paymentmodal}
        visibilityhandler={paymentmodalvisibilityhandler}
        AfterReceiving={finalizeSale}
      />
    </Modal>
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

export default CartModal;
