import React from 'react';
import {View, StyleSheet, Modal, Text, Button} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const ConfirmDeleteModal = ({
  visible,
  visibilityhandler,
  index,
  ondeleteItem,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => {
        visibilityhandler();
      }}>
      <View style={styles.section1}></View>
      <View style={styles.section2}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <MaterialIcons
            name="cancel"
            size={28}
            style={{height: 30}}
            onPress={() => {
              console.log('onCancel pressed');
              visibilityhandler();
            }}
          />
          <View style={{flex: 1, height: 30}}></View>
        </View>
        <View style={{flex: 1}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 17}}>
            Are U Sure You Want To delete index {index + 1} Sale
          </Text>
        </View>
        <View
          style={{
            flex: 0.6,
            flexDirection: 'row',
          }}>
          <View style={{flex: 1, marginRight: 10, justifyContent: 'flex-end'}}>
            <Button
              title="Yess"
              onPress={() => {
                console.log('Yess pressed', index);
                visibilityhandler();
                ondeleteItem(index);
              }}
            />
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Button
              title="No"
              onPress={() => {
                console.log('No Pressed', index);
                visibilityhandler();
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.section3}></View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  section1: {
    flex: 1,
  },
  section2: {
    flex: 1,
    backgroundColor: '#f8f8ff',
    elevation: 6,
    marginHorizontal: 40,
  },
  section3: {
    flex: 1,
  },
});

export default ConfirmDeleteModal;
