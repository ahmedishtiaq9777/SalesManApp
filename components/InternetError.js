import React from 'react';
import {Modal, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
const InternetError = ({visible, vibilityhandler, onRetry}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.row}></View>
      <View style={styles.content}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            flex: 1,
            textAlign: 'center',
          }}>
          No Internet
        </Text>
        <View style={styles.retryView}>
          <TouchableOpacity style={styles.retrybtn} onPress={onRetry}>
            <Text
              style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
              Retry
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}></View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  row: {
    flex: 1,
  },
  content: {
    borderRadius: 10,
    flex: 1.5,
    backgroundColor: '#fff8dc',
    marginHorizontal: 30,
  },
  retryView: {
    flex: 1,
  },
  retrybtn: {
    marginTop: 20,
    backgroundColor: 'red',
    marginHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btntext: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default InternetError;
