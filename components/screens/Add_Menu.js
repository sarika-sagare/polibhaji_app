
import React ,{useState,useEffect,useCallback} from 'react';
import { View,StyleSheet,KeyboardAvoidingView,Text,Alert,ActivityIndicator,ScrollView,Keyboard,TouchableWithoutFeedback} from 'react-native';
import PrimaryButton from '../common/PrimaryButton';
import Input from '../common/input';
import { AddingMenu,seeMenu } from '../constants/apis';
import RetrieveData from '../common/utilFunctions';
import { useFocusEffect } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,

} from 'react-native-responsive-screen';


export default function AddMenu({navigation}) {

  const [bhaji,setbhaji]=useState('');
  const [extras,setother]=useState(''); 
  const [data,setData]=useState([]);
  const [snack,setsnack]=useState('')
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

async function seemenu(){
    const token=await RetrieveData();
    fetch(seeMenu,{
      method: 'get', 
      headers: new Headers({
        // 'Authorization': 'Basic '+base64.encode("shubhampatil" + ":" +"shubhampatil"), 
        'Content-Type': 'application/json'
      }),
    }).then((response) =>response.json()) // get response, convert to json
      .then((json) => {
        setData(json.data);
        setLoading(false)
      })
      .catch((error) => alert(error))
  }

  useFocusEffect(useCallback(()=>{
    seemenu();
  },[]))

  useFocusEffect(useCallback(()=>{
  setData('');
  },[]))

  function setBhaji(enteredText){ 
    setbhaji(enteredText);
   }
   function setOther(enteredText){ 
    setother(enteredText);
   }

  function setSnack(enteredtext){
    setsnack(enteredtext)
  }

 async function ConfirmSubmit(){
  const token=await RetrieveData();
    fetch(AddingMenu,{ 
      method: 'post', 
      headers: new Headers({
        // 'Authorization': 'Basic '+base64.encode("shubhampatil" + ":" +"shubhampatil"), 
        'Authorization': 'token '+token, 
        'Content-Type': 'application/json'
      }), 
      body: 
      JSON.stringify({
        bhaji:bhaji,
        snaks:snack,
        extras:extras
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
       {isLoading && <ActivityIndicator size="large" />}
       <ScrollView>
       <TouchableWithoutFeedback 
              onPress={()=>{
                if(isKeyboardVisible==true){
                  Keyboard.dismiss()
                }
               
              }}
              accessible={false}>
    <View style={{flex:0.7, paddingBottom:5}}>
      <Text style={styles.text1}>Add Menu</Text>
          <View style={styles.textInput} >
            <Input label="Add Bhaji :"  textInputConfig={{placeholder:'bhaji',placeholderTextColor:"#808080",Value:data.bhaji,onChangeText:setBhaji}}/>
            <Input  label="Add extra items :" textInputConfig={{placeholder:'extras',placeholderTextColor:"#808080",Value:data.extras,onChangeText:setOther}}/>
            <Input label="Add Snack :" textInputConfig={{placeholder:'snack',placeholderTextColor:"#808080",Value:data.snaks,onChangeText:setSnack}}/>
        <View style={styles.login}>
        <PrimaryButton onPressfun={()=>{ConfirmSubmit()}}>Add</PrimaryButton>
        </View>
        </View>
    </View>
    </TouchableWithoutFeedback>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
text1:{
  textAlign:"left",
  fontSize:hp(3),
  fontWeight:"bold",
  color:"#663399",
  padding:5,
  borderBottomWidth:0.5,
  marginBottom:25
},
login:{
    alignSelf: 'center',
    width: "90%", 
    margin: 20,  
} 
});