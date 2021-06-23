import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorage {
  constructor() {}
  saveLoginpref = async value => {
    try {
      await AsyncStorage.setItem('salesmanid', value.toString());
    } catch (e) {
      // saving error
      console.log('error:', e);
    }
  };

  getLoginpref = async () => {
    try {
      const value = await AsyncStorage.getItem('salesmanid');
      if (value !== null) {
        // value previously stored
        return value;
      }
    } catch (e) {
      // error reading value
      return null;
    }
  };
}
export default LocalStorage;
