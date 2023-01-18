  import {View,Text,StyleSheet,ScrollView, KeyboardAvoidingView,Alert,SafeAreaView,Keyboard,TouchableWithoutFeedback} from 'react-native';
  import CheckBox from 'react-native-check-box';
  import PrimaryButton from '../common/PrimaryButton';
  import React ,{useState,useCallback} from 'react';
  import Input from '../common/input';
  import { AddFood } from '../constants/apis';
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


  async function requestUserPermission() {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log('Permission settings:', settings);
    } else {
      console.log('User declined permissions');
    }
  }  

  async function onCreateTriggerNotification() {
    
    const date = new Date(Date.now());
    date.setHours(9);
    date.setMinutes(20);

    // Create a time-based trigger
    const trigger={
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), 
      repeatFrequency: RepeatFrequency.DAILY,
    };
    const channelId =  notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    }); 
    // Create a trigger notification
  await notifee.createTriggerNotification(
      {
        id:'default',
        title: 'Add lunch before 10',
        body: 'Today',
        android: {
          channelId: 'default',
          pressAction: {
            id: 'default',
          },
        },
      },
      trigger,
    );

  }

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
      
        setMenu(json.data.lunchbhaji);
        setextras(json.data.extras);
        setsnacks(json.data.snaks);
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

  useEffect(()=>{
    if(Platform.OS === 'android'){
      onCreateTriggerNotification();
    }  
    if (Platform.OS === 'ios'){
      requestUserPermission();
      onCreateTriggerNotification();
    }
  },[])

  useFocusEffect(useCallback(()=>{
    see_menu();
  },[]))

  useFocusEffect(useCallback(()=>{
    AddMenu();
  },[]))

  const [value,setValue]=useState('');

  const [enteredNumber,setEnteredNumber]=useState('');

  const [check, setState] = useState(true);
    
  const [isClick, setClick] = useState(false);

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
      setClick(false)
      setSelect(false) 
    }

  async function ConfirmSubmit(){
    const token=await RetrieveData();
        fetch(AddFood ,{ 
          method: 'post', 
          headers: new Headers({
            'Authorization': 'token '+token, 
            'Content-Type': 'application/json'
          }), 
          body: 
          JSON.stringify({
            poli_count:choseNumber,
            bhakari_count:values,
            snaks:isClick,
            tea:isSelect
          })
        }).then(res=>res.json()).then((response)=>{
          if(response.success==true){
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
        if ((check==false & isClick==false & isSelect==false) ){
        Alert.alert(
            '', 'Please check the checkbox',
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
    if (check==false & isClick==true & isSelect==false){
      ConfirmSubmit();
      Alert.alert(
          '', 'You select tea ',
          [{text:'okay', style:'destructive'}]
    );
    return;
  }
  if (check==false & isClick==true & isSelect==true){
    ConfirmSubmit()
    Alert.alert(
        '', 'You select snacks and tea',
        [{text:'okay', style:'destructive'}]
  );
  return;
  }
  if (check==false & isClick==false & isSelect==true){
    ConfirmSubmit()
    Alert.alert(
        '', 'You select tea only',
        [{text:'okay', style:'destructive'}]
  );
  return;
  }
        
    if (check==true & isNaN(values) & choseNumber!=null & isClick==false & isSelect==false ){
      ConfirmSubmit()
    Alert.alert(
        '', 'you select'+choseNumber+ ' chapati',
        [{text:'okay', style:'destructive'}]
  );
  return;
  }
  if (check==true & isNaN(values) & choseNumber!=null &isClick==true & isSelect==false ){
    ConfirmSubmit()
    Alert.alert(
        '', 'you select'+choseNumber+ ' chapati and snack',
        [{text:'okay', style:'destructive'}]
  );
  return;
  }
  if (check==true & isNaN(values) & choseNumber!=null &isClick==false & isSelect==true){
    ConfirmSubmit()
    Alert.alert(
        '', 'you select'+choseNumber+ ' chapati and tea',
        [{text:'okay', style:'destructive'}]
  );
  return;
  }
  if (check==true & isNaN(values) & choseNumber!=null &isClick==true & isSelect==true){
    ConfirmSubmit()
    Alert.alert(
        '', 'you select'+choseNumber+ ' chapati ,snacks and tea',
        [{text:'okay', style:'destructive'}]
  );
  return;
  }
  if (check==true & isNaN(choseNumber) & values!=null & isClick==false & isSelect==false){
    ConfirmSubmit()
    Alert.alert(
        '', 'you select'+values+ ' bhakari',
        [{text:'okay', style:'destructive'}]
  );
  return;
  }
  if (check==true & isNaN(choseNumber) & values!=null & isClick==true & isSelect==false){
    ConfirmSubmit()
    Alert.alert(
        '', 'you select'+values+ ' bhakari and snacks',
        [{text:'okay', style:'destructive'}]
  );
  return;
  }
  if (check==true & isNaN(choseNumber) & values!=null & isClick==false & isSelect==true){
    ConfirmSubmit()
    Alert.alert(
        '', 'you select'+values+ ' bhakari and tea',
        [{text:'okay', style:'destructive'}]
  );
  return;
  }
  if (check==true & isNaN(choseNumber) & values!=null & isClick==true & isSelect==true){
    ConfirmSubmit()
    Alert.alert(
        '', 'you select'+values+ ' bhakari , snacks and tea',
        [{text:'okay', style:'destructive'}]
  );
  return;
  }
  }   

  if (isClick){
    selectedSnack='snack is selected'
  }
  else{
    selectedSnack='snack is not selected'
  }

  if(isSelect){
    selectedTea="tea is selected"
  }
  else{
    selectedTea="tea is not selected"
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
              <Text style={styles.Text1}>Todays Menu : {menu},{extras}</Text>
        <View style={{flexDirection:'row',alignItems:'baseline'}}>
              <CheckBox 
      style={{flex: 1, padding:10}}
      // onClick={checks}
      onClick={()=>
        setState(!check)
      }
      isChecked={check}    
  />
  <Text style={{paddingRight:wp('15%'), marginTop:9,fontSize:hp('2%'),color:'black'}}>Lunch</Text>
  </View>
  {/* <TextInput style={styles.texts} placeholder='No. Of Chapatis' keyboardType='number-pad' onChangeText={(text) => numbetinputHandler(text)}/> */}
  <Input textInputConfig={{placeholder:'No. Of Chapatis',placeholderTextColor:"#808080", keyboardType:"numeric",onChangeText:numbetinputHandler}}/>
  <Input textInputConfig={{placeholder:'No. Of Bhakaries',keyboardType:"number-pad",placeholderTextColor:"#808080",onChangeText:numbetinputHandler1}}/>
  <View style={{marginTop:hp(2)}}>
  <Text style={{color:"#808080",fontSize:hp('2%')}}> {msg}</Text>
  <Text style={{color:"#808080",fontSize:hp('2%')}}> {msgb} </Text>
  <Text style={styles.Text1}> Today's Snack : {snacks}</Text>
</View>
  <View >
  <View style={{flexDirection:'row',alignItems:'baseline'}}>
              <CheckBox 
      style={{flex: 1, padding: 10}}
      onClick={()=>
        setClick(!isClick)
      }
      isChecked={isClick}    
  />
  <Text style={{paddingRight:wp('15%'), marginTop:9,fontSize:hp('2%'),color:'black'}}>Snack</Text>
  </View>
  <View style={{flexDirection:'row'}}>
              <CheckBox 
      style={{flex: 1, padding: 10}}
      onClick={()=>
        setSelect(!isSelect)
      }
      isChecked={isSelect}    
  />
  <Text style={{paddingRight:wp('15%'),marginTop:9,fontSize:hp('2%'),color:'black'}}>Tea</Text>
  </View>
  </View>

  <View style={{margin:10}}>
  <Text style={{color:"#808080",fontSize:hp('2%')}}>{selectedSnack}</Text>
  <Text style={{color:"#808080",fontSize:hp('2%')}}>{selectedTea}</Text>
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