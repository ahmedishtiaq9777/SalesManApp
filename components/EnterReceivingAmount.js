import React, {useState} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';
import InternetError from './InternetError';

const EnterReceiving = ({visible, visibilityhandler, AfterReceiving}) => {
  const [ontextchange, setAmount] = useState(null);
  const [errorvisible, seterrorvisible] = useState(false);
  console.log('Amount:', ontextchange);
  const onDonePressed = () => {
    if (ontextchange > 0 && ontextchange != null) AfterReceiving(ontextchange);
    else {
      console.log('Enter Amount');
      alert('Enter Amount');
    }
  };

  const Retry = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        onDonePressed();
      }
    });
  };
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => {
        visibilityhandler();
      }}>
      <InternetError visible={errorvisible} onRetry={Retry} />
      <View style={styles.section1}></View>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.section2}>
          <View style={{flex: 0.4, flexDirection: 'row'}}>
            <MaterialIcons
              name="cancel"
              size={28}
              style={{height: 30, borderBottomWidth: 1}}
              onPress={() => {
                console.log('onCancel pressed');
                visibilityhandler();
              }}
            />
            <View
              style={{
                flex: 1,
                height: 30,

                borderBottomWidth: 1,
              }}></View>
          </View>

          <View style={{flex: 0.75, justifyContent: 'space-between'}}>
            <Text style={styles.receivingamountlabel}>
              Enter Receiving Amount
            </Text>
            <TextInput
              placeholder="Enter Amount"
              style={{borderWidth: 1, borderRadius: 10}}
              keyboardType="numeric"
              onChangeText={value => {
                // setAmount(value.trim());
                let tamount = parseFloat(value);
                setAmount(tamount);
                console.log('amountttt:', tamount);
              }}
            />
          </View>
          <View
            style={{flex: 0.7, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                backgroundColor: 'pink',
                paddingHorizontal: 20,
                borderRadius: 8,
              }}
              onPress={() => {
                NetInfo.fetch().then(state => {
                  if (state.isConnected) {
                    console.log('Amount:', ontextchange);
                    onDonePressed();
                  } else {
                    seterrorvisible(t => !t);
                  }
                });
              }}>
              <Text
                style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      <View style={styles.section3}></View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section1: {
    flex: 0.5,
  },
  section2: {
    flex: 1,
    backgroundColor: '#f8f8ff',
    elevation: 9,
    marginHorizontal: 40,
    borderRadius: 7,
  },
  section3: {
    flex: 0.5,
  },
  receivingamountlabel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default EnterReceiving;
