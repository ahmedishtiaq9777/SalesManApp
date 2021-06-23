import React from 'react';
import {View, Text} from 'react-native';
const ShopkeeperDetail = ({navigation, route}) => {
  const {item} = route.params;
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,

          borderRadius: 10,
          marginHorizontal: 90,
          paddingVertical: 10,
          elevation: 4,
        }}>
        {item.name}
      </Text>
      <View
        style={{
          flex: 0.2,
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 50,
        }}>
        <Text style={{fontSize: 20}}>Contact:</Text>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.contact}</Text>
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1.6,

            alignItems: 'center',
            paddingTop: 10,
            marginHorizontal: 20,

            backgroundColor: '#f0ffff',
            borderRadius: 10,
            elevation: 6,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 40,
            }}>
            Address
          </Text>
          <Text>{item.address}</Text>
        </View>
        <View style={{flex: 1}}></View>
      </View>
    </View>
  );
};

export default ShopkeeperDetail;
