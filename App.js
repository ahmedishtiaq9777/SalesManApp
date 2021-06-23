/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Login from './screens/login';
import 'react-native-gesture-handler';
import MainStackNavigator from './navigation/MainStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
const App = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default App;
