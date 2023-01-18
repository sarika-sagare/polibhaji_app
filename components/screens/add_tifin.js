import {View,Text,StyleSheet,ScrollView, KeyboardAvoidingView,Alert,SafeAreaView,Keyboard,TouchableWithoutFeedback} from 'react-native';
import CheckBox from 'react-native-check-box';
import PrimaryButton from '../common/PrimaryButton';
import React ,{useState,useCallback} from 'react';
import Input from '../common/input';
import { AddDinner } from '../constants/apis';
import {useEffect,useRef} from 'react';
import { seeMenu } from '../constants/apis';
import {useFocusEffect} from '@react-navigation/native';
import RetrieveData from '../common/utilFunctions';
import notifee, { TriggerType,AuthorizationStatus,RepeatFrequency} from '@notifee/react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isCount } from './redux/actions/users';
import { useDispatch,useSelector } from 'react-redux';

export default  function Menu({navigation}){
const [menu,setMenu]=useState([]);
const [extras,setextras]=useState([]);
const [snacks,setsnacks]=useState([]);
const [isLoading, setLoading] = useState(true);
const [isKeyboardVisible, setKeyboardVisible] = useState(false);


const dispatch = useDispatch();

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



async function see_menu(){
  const token=await RetrieveData();
  fetch(seeMenu,{
    method: 'get', 
    headers: new Headers({
      // 'Authorization': 'Basic '+base64.encode("shubhampatil" + ":" +"shubhampatil"), 
      'Content-Type': 'application/json'
    }),
  }).then((response) =>response.json()) // get response, convert to json
    .then((json) => {
    
      setMenu(json.data.dinnerbhaji);
     
    })
    .catch((error) => alert(error)) // display errors    
}

async function AddMenu(){
  const token=await RetrieveData();
  console.log('menus are',AddFood)
  fetch(AddFood,{
    method: 'get', 
    headers: new Headers({
      'Authorization': 'token '+token, 
      'Content-Type': 'application/json'
    }),
  }).then((response) =>response.json()) // get response, convert to json
    .then((json) => {
      const c1=json.data.poli_count
      const c2=json.data.bhakari_count
      const c3=json.data.snaks
      const c4=json.data.tea

      // dispatch(isCount(c1,c2,c3,c4))

      setPolicount(json.data.poli_count)
      setBhakariCount(json.data.bhakari_count)
      setisSnack(json.data.snaks)
      setIsTea(json.data.tea)
    })
    .catch((error) => alert(error))
     // display errors
    
}



useFocusEffect(useCallback(()=>{
  see_menu();
},[]))

useFocusEffect(useCallback(()=>{
  AddMenu();
},[]))

const [value,setValue]=useState('');

const [enteredNumber,setEnteredNumber]=useState('');

const [check, setState] = useState(false);
  
// const [isClick, setClick] = useState(false);

const [isSelect, setSelect] = useState(false);

const [PoliCount,setPolicount] = useState()
const [BhakariCount,setBhakariCount]=useState()
const [isSnack,setisSnack]=useState()
const [isTea,setIsTea]=useState()

let selectedSnack
let selectedTea

  function numbetinputHandler(enteredText){ 
    setEnteredNumber(enteredText);
  }

  function numbetinputHandler1(enteredText){ 
    setValue(enteredText);
  }

  const choseNumber = parseFloat(enteredNumber);
    const values = parseFloat(value)

  function resetInputHAndler(){ 
    setState(false)
   
  }

async function ConfirmSubmit(){
  const token=await RetrieveData();
      fetch(AddDinner ,{ 
        method: 'post', 
        headers: new Headers({
          'Authorization': 'token '+token, 
          'Content-Type': 'application/json'
        }), 
        body: 
        JSON.stringify({
          poli_count:choseNumber,
          bhakari_count:values,
       
        })
      }).then(res=>res.json()).then((response)=>{
         console.log('api res',response)
        if(response.success==true){2
        }
        if(response.success==false){
          Alert.alert(
            'Error',response.message,
            [{text:'okay',style:'destructive'}]
          );
          return;
        }
      })
    }
  
  function ConfirmInput(){
    AddMenu();
if(check==false){
    Alert.alert(
        '', 'please check the dinner checkbox',
        [{text:'okay', style:'destructive',onPress:resetInputHAndler}]
  );
  return;
}

  if (check==true & isNaN(choseNumber)==false & isNaN(values)==false){
    Alert.alert(
        '', 'you select both chapati and bhakari,Please select any one',
        [{text:'okay', style:'destructive',onPress:resetInputHAndler}]
  );
  return;
  }

  if (check==true & isNaN(values) & isNaN(choseNumber)){
    Alert.alert(
        '', 'enter a number of chapati or bhakari',
        [{text:'okay', style:'destructive'}]
  );
  return;
  } 
  if (check==true & (values<0 | choseNumber<0)){
    Alert.alert(
        '', 'Please select valid count',
        [{text:'okay', style:'destructive'}]
  );
  return;
  } 
  if (check==true & (values>10  | choseNumber>10)|(values<0 | choseNumber<0)){
    Alert.alert(
        '', 'you can not select chapati or bhakari more than 10',
        [{text:'okay', style:'destructive'}]
  );
  return;
  } 

if (check==true & isNaN(choseNumber) & values!=null){
  ConfirmSubmit()
  Alert.alert(
      '', 'you select'+values+ ' bhakari',
      [{text:'okay', style:'destructive'}]
);
return;
}
if (check==true & isNaN(values) & choseNumber!=null){
    ConfirmSubmit()
    Alert.alert(
        '', 'you select'+choseNumber+ ' chapati',
        [{text:'okay', style:'destructive'}]
  );
  return;
  }
}   



if(choseNumber<=0 | isNaN(choseNumber)){
  msg='Poli count is 0'
}
else{
  msg='you have entered '+choseNumber+' poli'
}

if (values<=0 | isNaN(values)){
 msgb='Bhakari count is 0 '
}
else{
  msgb='you have entered '+values+' Bhakari'
}

return(
      <KeyboardAvoidingView  style={{flex:1}} keyboardVerticalOffset={10} >
        {/* {isLoading && <ActivityIndicator size="large" />} */}
        <SafeAreaView>
        <TouchableWithoutFeedback 
            onPress={()=>{
              if(isKeyboardVisible==true){
                Keyboard.dismiss()
              }
             
            }}
            accessible={false}>
          <ScrollView>
        <View style={{ justifyContent: 'center', paddingBottom:5}}>
            <Text style={styles.Text1}>Todays Menu : {menu}</Text>
      <View style={{flexDirection:'row',alignItems:'baseline'}}>
            <CheckBox 
    style={{flex: 1, padding:10}}
    // onClick={checks}
    onClick={()=>
      setState(!check)
    }
    isChecked={check}    
/>
<Text style={{paddingRight:wp('15%'), marginTop:9,fontSize:hp('2%'),color:'black'}}>Dinner</Text>
</View>
{/* <TextInput style={styles.texts} placeholder='No. Of Chapatis' keyboardType='number-pad' onChangeText={(text) => numbetinputHandler(text)}/> */}
<Input textInputConfig={{placeholder:'No. Of Chapatis',placeholderTextColor:"#808080", keyboardType:"numeric",onChangeText:numbetinputHandler}}/>
<Input textInputConfig={{placeholder:'No. Of Bhakaries',keyboardType:"number-pad",placeholderTextColor:"#808080",onChangeText:numbetinputHandler1}}/>
<View style={{marginTop:hp(2)}}>
<Text style={{color:"#808080",fontSize:hp('2%')}}> {msg}</Text>
<Text style={{color:"#808080",fontSize:hp('2%')}}> {msgb} </Text>
</View>

</View>
<View style={{paddingTop:10}}>
<PrimaryButton  onPressfun={ConfirmInput}>Submit </PrimaryButton>
</View>
</ScrollView>
</TouchableWithoutFeedback>
</SafeAreaView>

    </KeyboardAvoidingView>
   
)
}

const styles = StyleSheet.create({
    Text1:{
        marginTop:10,
        color:'red',
        fontSize:hp('2%'),
      },
      Text2:{
        color:'',
        fontSize:hp('4%'),
      },
      
  
  });