import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
const ShopsGrid = ({item, onGridpress, visibilityhandler, OnLondPressCard}) => {
  return (
    <TouchableOpacity
      style={styles.grid}
      onPress={() => {
        onGridpress(item);
      }}
      onLongPress={() => {
        //visibilityhandler();
        OnLondPressCard(item);
        console.log('item', item);
      }}>
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  grid: {
    flex: 1,
    margin: 15,
    height: 100,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    elevation: 6,
  },
  title: {
    textAlign: 'center',
    flex: 1,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlignVertical: 'center',
  },
  titleview: {
    flexDirection: 'row',
    flex: 1,

    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    marginTop: 40,
    borderWidth: 1,
  },
});
export default ShopsGrid;
