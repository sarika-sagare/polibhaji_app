import React ,{useState, useEffect,useCallback}from 'react';
import { StyleSheet, View,ActivityIndicator,Image} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './components/screens/loginScreen';
import { Provider } from 'react-redux';
import configureStore from './components/screens/redux/store';
import ChangePass from './components/screens/reset_userPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import MyDrawer from './components/constants/drawer';
import LoadingScreen from './components/screens/loadingScreen';
import {useSelector } from 'react-redux';
import Menu from './components/screens/Menu';
import CustomDrawer from './components/CustomDrawer';
import ChangePassword from './components/screens/changePassword';
import Register from './components/screens/Register';
import AddMenu from './components/screens/Add_Menu';
import SeeCount from './components/screens/seeCount';
import SeeUser from './components/screens/seeUsers';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,

} from 'react-native-responsive-screen';
import { Logo } from './src/image';

const store = configureStore();



function openAdminDrawer(){
  const Drawer = createDrawerNavigator();
return (
        <Drawer.Navigator initialRouteName='Menu'  drawerContent={props => <CustomDrawer {...props}/>} screenOptions={{drawerLabelStyle:{fontSize:hp('2%')}
,drawerContentStyle:{backgroundColor:"#FFE4C4",}, drawerActiveBackgroundColor:"#f0e1ff",  headerTitle:()=>(<Image style={styles.image}source={Logo}/>), headerTintColor:'black',headerStyle: { backgroundColor: '#1E90FF',height:hp(7),}}}>
          <Drawer.Screen name="Menu" component={Menu} options={{
              drawerLabel:'Add Lunch & snack',

            }}/>
          <Drawer.Screen name="ChangePassword" component={ChangePassword} options={{
              title: 'EMPLOYEE SECTION',
              drawerLabel:'Change password',
            }}/>
    <Drawer.Screen name="AddMenu" component={AddMenu} options={{
              title: 'ADMIN SECTION',
              drawerLabel:'Add Menu',
            }}/>
    <Drawer.Screen name="Register" component={Register} options={{
              title: 'ADMIN SECTION',
              drawerLabel:'Registration',
               
            }}/>
    <Drawer.Screen name="count" component={SeeCount} options={{
              title: 'ADMIN SECTION',
              drawerLabel:'Poli Count',

            }}/> 
    <Drawer.Screen name="SeeUser" component={SeeUser} options={{
              title: 'ADMIN SECTION',
              drawerLabel:'Employee list',
               
            }}/> 
    
        </Drawer.Navigator>    
      );
      }

function openEmployeeDrwaer(){
  const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator  drawerContent={props => <CustomDrawer {...props}/>} screenOptions={{drawerLabelStyle:{fontSize:hp('2%')},drawerContentStyle:{backgroundColor:"#FFE4C4",}, 
         drawerActiveBackgroundColor:"#f0e1ff",  headerTitle:()=>(<Image style={styles.image}
          source={Logo}/>),headerStyle: { backgroundColor: '#1E90FF',height:hp(7)},headerTintColor: 'black',}}>      
          <Drawer.Screen name="Menu" component={Menu} options={{
            title: 'EMPLOYEE SECTION',
            drawerLabel:'Add Lunch & snack',
          }}/>
      </Drawer.Navigator>
      )
}
    


 function MyDrawer() {

//   const[useris,setisuser]=useState('');
//   async function RetrieveUsername() {
//     let d = await AsyncStorage.getItem('user');
//     if (d){
//       setisuser(d)
//     }
//   } 
//   useEffect(()=>{
//     RetrieveUsername()
//   },[])
//  console.log('useris',useris) 

    let drawer = useSelector(state => state.AdReducer.Admin)
    console.log('drawer drawer',drawer)
if (drawer==1){
  console.log('admin')
  return(
    openAdminDrawer()
  )
}
else{
  console.log('adminemp')

 return(
  
  openEmployeeDrwaer()
 )
}

}

function App() { 
 
    return (

    <Provider store={store}>
    <View style={{flex:1}}>
    <MyStack/>
   </View>
   </Provider>
  );
}

const MyStack = () => {
  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{headerShown: false}} initialRouteName='Splash' >
        <Stack.Screen
          name="Splash"
          component={LoadingScreen}
          />
          <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="Drawer" component={MyDrawer}/>
        <Stack.Screen name='userPassword' component={ChangePass}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 

export default App


const styles = StyleSheet.create({
  image:{
    marginTop:hp(-2),
    resizeMode: 'contain',
    // alignSelf: 'center',
    width:wp(30),
    height:hp(7),
    
  },
})