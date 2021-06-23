import React from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/login';
import Home from '../screens/home';
import NewSale from '../screens/NewSale';
import SelectShopkeeper from '../screens/SelectShopkeeper';
import SaleHistory from '../screens/SaleHistory';
import SaleDetail from '../screens/SaleDetail';
import ShopkeeperDetail from '../screens/shopkeeperDetail';
import PendingRecoveries from '../screens/PendingRecoveries';
import ReceivingForm from '../screens/ReceivingForm';
import ReceivingLogs from '../screens/ReceivingLogs';
const Stack = createStackNavigator();
const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        options={{headerShown: false}}
        component={Login}
      />

      <Stack.Screen
        name="Home"
        options={{
          header: props => (
            <Text
              style={{
                backgroundColor: 'lightgrey',
                height: 40,
                textAlign: 'center',
                textAlignVertical: 'center',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Home
            </Text>
          ),
        }}
        component={Home}
      />

      <Stack.Screen
        name="selectshop"
        options={{
          headerTitleAlign: 'center',
          title: 'Select Shopkeeper',
          headerShown: false,
        }}
        component={SelectShopkeeper}
      />
      <Stack.Screen name="Shopdetails" component={ShopkeeperDetail} />

      <Stack.Screen
        name="Sale"
        options={{
          headerTitleAlign: 'center',
          title: 'New Sale',
          headerTitleStyle: {fontSize: 22, fontWeight: 'bold'},
        }}
        component={NewSale}
      />
      <Stack.Screen
        name="salehistory"
        options={{
          headerTitleAlign: 'center',
          title: 'Sale History',
          headerTitleStyle: {fontSize: 22, fontWeight: 'bold'},
        }}
        component={SaleHistory}
      />
      <Stack.Screen
        name="saledetail"
        options={{
          headerTitleAlign: 'center',
          title: 'Sale Detail',
          headerTitleStyle: {fontSize: 22, fontWeight: 'bold'},
        }}
        component={SaleDetail}
      />
      <Stack.Screen
        name="pendingrecoveries"
        component={PendingRecoveries}
        options={{
          headerTitleAlign: 'center',
          title: 'Pending Recoveries',
          headerTitleStyle: {fontSize: 22, fontWeight: 'bold'},
        }}
      />
      <Stack.Screen
        name="Receiving"
        component={ReceivingForm}
        options={{
          headerTitleAlign: 'center',
          title: 'Receiving',
          headerTitleStyle: {fontSize: 20, fontWeight: 'bold'},
        }}
      />
      <Stack.Screen
        name="ReceivingLogs"
        component={ReceivingLogs}
        options={{
          headerTitleAlign: 'center',
          title: 'Received Logs',
          headerTitleStyle: {fontSize: 20, fontWeight: 'bold'},
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
