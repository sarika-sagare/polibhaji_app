import React, {useState, useEffect,useRef,useCallback} from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import PrimaryButton from '../common/PrimaryButton';
import {useNavigation,useFocusEffect} from '@react-navigation/native';
import { Logo } from '../../src/image';
import {useSelector, useDispatch} from 'react-redux';
import Input from '../common/input';


import {isAdmin, isEmployee,resetState} from './redux/actions/users';

import {AdminLogin} from '../constants/apis';
import {EmployeeLogin} from '../constants/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';



var users = [
  {label: 'ADMIN', value: 0},
  {label: 'EMPLOYEE', value: 1},
];
export default function Main() {
  const navigation = useNavigation();


  useFocusEffect(
    useCallback(() => {
      console.log('asd',drawer),

      dispatch(resetState());
      // dispatch(isAdmin(0))
      
    },[])
    )

  let drawer = useSelector(state => state.AdReducer.Admin);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  let url;
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user=useRef('employee');
  const [svalue,setval]=useState(0)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    // console.log('proCompYear....',proCompYear)
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  console.log('svalue is',svalue),

console.log('user is',user.current)

  if (user.current=='employee') {
    url = EmployeeLogin;
  }
  if (user.current=='admin') {
    url = AdminLogin;
  }

  



  function usernameHandler(enteredText) {
    setusername(enteredText);
  }
  function passwordHandler(enteredText) {
    setpassword(enteredText);
  }

  function ConfirmInput() {
    let user;
    if (username.length < 1) {
      Alert.alert('Somthing went wrong', 'enter valid username', [
        {text: 'okay', style: 'destructive'},
      ]);
      return;
    }
    if (password.length < 1) {
      Alert.alert('Somthing went wrong', 'enter valid password', [
        {text: 'okay', style: 'destructive'},
      ]);
      return;
    }
    console.log('admin login',url)
    fetch(AdminLogin, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(async response => {
        if (response.success == true) {
          navigation.navigate('Drawer');
          await AsyncStorage.setItem('token', response.data.token);
          await AsyncStorage.setItem('username', response.data.username);
          if (response.data.is_admin == true) {
            // user = 'admin';
            // dispatch(isEmployee());
            console.log('loged in admin')
            await AsyncStorage.setItem('user', 'admin');
            dispatch(isAdmin(1))

          } else if(response.data.is_admin==false){
            user = 'employee';
            console.log('loged in employee')
            await AsyncStorage.setItem('user', 'employee');
            // dispatch(isAdmin());
            dispatch(isAdmin(0))

          }
          setLoading(false)
          return;
        }
        if (response.status != 200) {
          Alert.alert('Error', response.message, [
            {text: 'okay', style: 'destructive'},
          ]);
          setLoading(false);
          return;
        }
      });
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1,}}
      keyboardVerticalOffset={10}
      behavior="height">
        <TouchableWithoutFeedback 
              onPress={()=>{
                if(isKeyboardVisible==true){
                  Keyboard.dismiss()
                }
               
              }}
              accessible={false}>
      <View style={{flex: 0.7, justifyContent: 'center', paddingBottom: 5}}>
        
        <Image
          style={styles.image}
          source={Logo}
        />
        {/* <RadioForm
          style={styles.buttons}
          radio_props={users}
          initial={drawer}
          value={drawer}
          onPress={value => {
            setval(value)
            if (value == 1) {
              user.current=='employee';
              url = EmployeeLogin;
              // dispatch(isAdmin());
            }
            if (value == 0) {
              user.current='admin';
              url = AdminLogin;
              // dispatch(isEmployee());
            }
          }}
        /> */}
        <View style={styles.textInput}>
          <Input
            textInputConfig={{
              placeholderTextColor:"#808080",
              placeholder: 'Username',
              onChangeText: usernameHandler,
            }}
            
          />
          <Input
            textInputConfig={{
              placeholderTextColor:"#808080",
              placeholder: 'Password',
              secureTextEntry: true,
              onChangeText: passwordHandler,
            }}
          />
          <View style={styles.login}>
            <PrimaryButton
              onPressfun={() => {
                ConfirmInput();
              }}>
              Login
            </PrimaryButton>
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: hp(6),
    resizeMode: 'contain',
    alignSelf: 'center',
    width: hp(30),
    height: hp(30),
  },
  buttons: {
    flexDirection: 'row',
    marginLeft: 50,
    marginRight: 50,
    justifyContent: 'space-between',
  },
  textInput: {
    marginTop: 5,
    borderBottomColor: 'black',
    color: '#120438',
    width: '100%',
    padding:hp(2),
  },
  login: {
    alignSelf: 'center',
    width: '90%',
    margin: 20,
  },
});
