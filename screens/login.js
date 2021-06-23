import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Button,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import ApiController from '../api/apicontroller';
import LocalStorage from '../api/storagecontroller';
import InternetError from '../components/InternetError';
const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const [visible, setvisible] = useState(false);
  const [errorvisible, seterrorvisible] = useState(false);
  controller = new ApiController();
  localstorage = new LocalStorage();

  const loginpress = async () => {
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.isConnected) {
        console.log('username:', username);
        console.log('password:', password);

        if (username === '' || password === '') {
          alert('Please fill the Fields');
        } else {
          const dologin = async () => {
            setvisible(true);
            let result = await controller.Login(username, password);
            console.log('resultttttt:', result);
            if (result != '0') {
              setvisible(false);

              localstorage.saveLoginpref(result);
              ToastAndroid.show('Login Successfull', ToastAndroid.SHORT);

              navigation.replace('Home');

              // alert('Login Succesfull');
            } else if (result == '0') {
              alert('Wrong Info');
              setvisible(false);
            } else {
              alert('error:', result);
              setvisible(false);
            }
          };
          dologin();
        }
      } else {
        seterrorvisible(t => !t);
      }
    });
  };
  const InternetErrorVisibility = () => {
    seterrorvisible(t => !t);
  };
  const OnInternetRetry = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        seterrorvisible(t => !t);
      }
    });
  };

  return (
    <>
      {visible ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <>
          <InternetError
            visible={errorvisible}
            vibilityhandler={InternetErrorVisibility}
            onRetry={OnInternetRetry}
          />
          <View style={styles.container}>
            <View style={styles.section1}></View>
            <View style={styles.loginsection}>
              <View style={styles.Logintext}>
                <Text
                  style={{
                    fontSize: 27,
                    fontWeight: 'bold',
                  }}>
                  Login
                </Text>
              </View>
              <View style={styles.username}>
                <TextInput
                  placeholder="Enter UserName"
                  onChangeText={text => setUsername(text.trim())}
                  style={{borderWidth: 1, paddingHorizontal: 50, elevation: 2}}
                />
              </View>
              <View style={styles.password}>
                <TextInput
                  placeholder="Enter Password"
                  onChangeText={text => {
                    setpassword(text.trim());
                  }}
                  style={{borderWidth: 1, paddingHorizontal: 50, elevation: 2}}
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.button}>
                <TouchableHighlight
                  style={{marginHorizontal: 100}}
                  onPress={loginpress}>
                  <View
                    style={{
                      backgroundColor: 'green',
                      borderRadius: 9,
                      height: 30,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: 'white',
                      }}>
                      SignIn
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
            <View style={styles.section3}></View>
          </View>
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section1: {
    flex: 1,
  },
  loginsection: {
    flex: 7.5,
  },
  Logintext: {
    flex: 0.5,
    backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  password: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,

    marginTop: 40,
  },
  section3: {
    flex: 1,
  },
});

export default Login;
