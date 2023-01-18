import React,{useState,useEffect}from 'react';
import { View, Text, StyleSheet,Alert,ActivityIndicator,TouchableOpacity,Keyboard,TouchableWithoutFeedback } from 'react-native';
import PrimaryButton from '../common/PrimaryButton';
import Input from '../common/input';
import { ChangeUserPassword } from '../constants/apis';
import RetrieveData from '../common/utilFunctions';

export default function ChangePass({route,navigation}) {

const [password,setConfirmPass]=useState('')
const [isKeyboardVisible, setKeyboardVisible] = useState(false);


const Iid=route.params.Iid;
const name=route.params.name

function confirmPass(enteredText){ 
  setConfirmPass(enteredText);
}

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

async function ConfirmSubmit(){
  const token=await RetrieveData();
  fetch(ChangeUserPassword,{ 
    method: 'post', 
    headers: new Headers({
      // 'Authorization': 'Basic '+base64.encode("shubhampatil" + ":" +"shubhampatil"), 
      'Authorization': 'token '+token, 
      'Content-Type': 'application/json'
    }), 
    body: 
    JSON.stringify({
      userID:Iid,
      new_password:password
     })
  }).then(res=>res.json()).then((response)=>{
    if(response.success==true){
      navigation.goBack()
      Alert.alert(
        'sucess',response.message,
        [{text:'okay',style:'destructive'}]
      );
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
    <View style={styles.main}>
      <TouchableWithoutFeedback 
              onPress={()=>{
                if(isKeyboardVisible==true){
                  Keyboard.dismiss()
                }
               
              }}
              accessible={false}>
         {/* {isLoading && <ActivityIndicator size="large" />} */}
        <Text style={styles.text}>Change Password of {name} </Text>
        <Input textInputConfig={{placeholder:'Confirm Password', secureTextEntry:true, onChangeText:confirmPass}}/>
       <View style={{margin:15}}>
       <PrimaryButton onPressfun={()=>{ConfirmSubmit()}}>CHANGE PASSWORD</PrimaryButton>
       <TouchableOpacity style={styles.back} onPress={() =>navigation.goBack()}>
    <View style={styles.btn}>
      <Text style={styles.btnText}>Back</Text>
    </View>
  </TouchableOpacity>
       </View>
       </TouchableWithoutFeedback>
    </View>
   
  );
}
const styles = StyleSheet.create({
  main:{
    flex:1,
  },
      text:{
        textAlign:"left",
        fontSize:25,
        fontStyle:"italic",
        fontWeight:"bold",
        color:"#663399",
        padding:5,
        borderBottomWidth:0.5,
        borderBottomColor:"black",
        marginBottom:25
      },
      back:{
        alignSelf: 'flex-start',
        padding:10,
        paddingTop:25,
        alignSelf: 'flex-end',
      },
      btn: { width:60, height:25, backgroundColor: '#BCC6CC',  borderRadius: 9 },
      btnText: { textAlign: 'center', color: '#4863A0' },
  });