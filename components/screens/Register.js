
import React,{useState,useEffect} from 'react';
import { View,StyleSheet,KeyboardAvoidingView,Text,Alert,Keyboard,TouchableWithoutFeedback} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PrimaryButton from '../common/PrimaryButton';
import Input from '../common/input';
import { Registration } from '../constants/apis';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,

} from 'react-native-responsive-screen';
import RetrieveData from '../common/utilFunctions';

export default function Register({navigation}) {

  const [username,setusername]=useState('');
  const [password,setpassword]=useState('');
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

  function usernameHandler(enteredText){ 
    setusername(enteredText);
   }
   function passwordHandler(enteredText){ 
    setpassword(enteredText);
   }

   async function ConfirmSubmit(){
    const token=await RetrieveData();
    fetch(Registration,{ 
      method: 'post', 
      headers: new Headers({
        // 'Authorization': 'Basic '+base64.encode("shubhampatil" + ":" +"shubhampatil"), 
        'Authorization': 'token '+token,
          'Content-Type': 'application/json'
      }), 
      body: 
      JSON.stringify({
        username:username,
        password:password
       })
    }).then(res=>res.json()).then((response)=>{
      if(response.success==true){
        Alert.alert(
          'sucess',response.message,
          [{text:'okay',style:'destructive'}]
        );
        return;
      }
      else{
        console.log('response',response)
        Alert.alert(
          'Error',response.message,
          [{text:'okay',style:'destructive'}]
        );
        return;
      }
    })

  }
        
  return (
    <KeyboardAvoidingView
     style={{flex:1}} keyboardVerticalOffset={10} behavior="height">
      <TouchableWithoutFeedback 
              onPress={()=>{
                if(isKeyboardVisible==true){
                  Keyboard.dismiss()
                }
               
              }}
              accessible={false}>
    <View style={{flex:0.7, paddingBottom:5}}>
      <Text style={styles.text}>Add User</Text>
          <View style={styles.textInput} >
            <Input textInputConfig={{placeholder:'Username',placeholderTextColor:"#808080", onChangeText:usernameHandler}}/>
            <Input textInputConfig={{placeholder:'Password', placeholderTextColor:"#808080",secureTextEntry:true, onChangeText:passwordHandler}}/>
        <View style={styles.login}>
        <PrimaryButton onPressfun={()=>{ConfirmSubmit()}}>Submit</PrimaryButton>
        </View>
        </View>
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
 text:{
  textAlign:"left",
  fontSize:hp(3),
  fontWeight:"bold",
  color:"#663399",
  padding:5,
  borderBottomWidth:0.5,
 },
  textInput:{
    // borderWidth:1,
    // flex:1,
    marginTop:5,
    borderBottomColor:'black',
    color:'#120438',
    width:'100%',
    padding:8,
},
login:{
    alignSelf: 'center',
    width: "90%", 
    margin: 20,  
    
} 
});