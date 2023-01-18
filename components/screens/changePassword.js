import React,{useState,useEffect}from 'react';
import { View, Text, StyleSheet,Alert,TouchableOpacity,ScrollView,Keyboard,TouchableWithoutFeedback} from 'react-native';
import PrimaryButton from '../common/PrimaryButton';
import Input from '../common/input';
import { admin_password } from '../constants/apis';
import RetrieveData from '../common/utilFunctions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';


export default function ChangePassword({navigation}) {

const [OldPass, setOldPass]=useState('')
const [NewPass,setNewpass]=useState('')
const [ConfirmPass,setConfirmPass]=useState('')
const [token,savetoken]=useState('')
const [isLoading,setLoading]=useState(true)
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

function oldPass(enteredText){ 
  setOldPass(enteredText);
}
function newPass(enteredText){ 
  setNewpass(enteredText);
}
function confirmPass(enteredText){ 
  setConfirmPass(enteredText);
}

function ResetHandler(){
  setOldPass('');
  setNewpass('');
  setConfirmPass('');
}

async  function ConfirmSubmit(){
  ResetHandler();
 const val=await RetrieveData();
  fetch(admin_password ,{ 
    method: 'post', 
    headers: new Headers({
      // 'Authorization': 'Basic '+base64.encode("shubhampatil" + ":" +"shubhampatil"), 
      'Authorization': 'token '+ val, 
      'Content-Type': 'application/json'
    }), 
    body: JSON.stringify({
      old:OldPass,
      new:NewPass,
      confirm:ConfirmPass
     })
  }).then(res=>res.json()).then((response)=>{
    if(response.success==true){
      Alert.alert(
        'sucess',response.message,
        [{text:'okay',style:'destructive'}]
      );
      setLoading(false)
      return;
    }
    else{
      Alert.alert(
        'Error',response.message,
        [{text:'okay',style:'destructive'}]
      );
      return;
    }
  })

}


  return (
    <TouchableWithoutFeedback 
              onPress={()=>{
                if(isKeyboardVisible==true){
                  Keyboard.dismiss()
                }
               
              }}
              accessible={false}>
    <ScrollView style={styles.main}>
                <Text style={styles.text}>Change Password</Text>
                
        <Input textInputConfig={{placeholder:'Old Password',placeholderTextColor:"#808080", secureTextEntry:true,onChangeText:oldPass}}/>
        <Input textInputConfig={{placeholder:'New Password', placeholderTextColor:"#808080",secureTextEntry:true, onChangeText:newPass}}/>
        <Input textInputConfig={{placeholder:'Confirm Password', placeholderTextColor:"#808080",secureTextEntry:true, onChangeText:confirmPass}}/>
       <View style={{margin:15}}>
       <PrimaryButton onPressfun={()=>{ConfirmSubmit()}}>CHANGE PASSWORD</PrimaryButton>
       <TouchableOpacity style={styles.back} onPress={() =>navigation.goBack()}>
    <View style={styles.btn}>
      <Text style={styles.btnText}>Back</Text>
    </View>
  </TouchableOpacity>
  
       </View>
    </ScrollView>
   </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
      main:{
        flex:1,     
      },
      text:{
        textAlign:"left",
        fontSize:hp('3%'),
        fontWeight:"bold",
        color:"#663399",
        padding:5,
        paddingTop:10,
      },
      back:{
        alignSelf: 'flex-start',
        padding:10,
        paddingTop:25,
        alignSelf: 'flex-end',
      },
      btn: { width:wp(22), backgroundColor: '#BCC6CC',  borderRadius: 9, textAlignVertical:'center',paddingVertical:hp('0.5%') },
      btnText: { textAlign: 'center', color: '#4863A0',fontSize:hp('3%') },
    
  });