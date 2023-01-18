import React, {useState,useEffect,useCallback}from 'react';
import { View, Text, StyleSheet,Button,TouchableOpacity} from 'react-native';
import { DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';

// import Ionicons from 'react-native-vector-icons'
export default function CustomDrawer(props) {
 
  const navigation=useNavigation();
  const [username,setusername]=useState('')

  async function Onclick() {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('user');
    navigation.navigate('Main')
  }  
 
  async function RetrieveUsername() {
    let d = await AsyncStorage.getItem('username');
    if (d){
      setusername(d)
    }
  }  

useEffect(()=>{
  RetrieveUsername();
})

  

  return (
      <View style={{flex:1}}>
       <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor:'blue'}}>
           <View style={{ height:hp(9),paddingHorizontal:wp('4%'),paddingTop:hp('2%')}}>
           <Text style={{color:'white',fontSize:hp('3%'), }}>
           {username}
           </Text>
            
            
         {/* <Button title='Logout' onPress={()=>{Onclick()}} color="#9932CC" /> */}
           </View>
           <View style={{flex:1,backgroundColor:'#fff',paddingTop:10}}>
           <DrawerItemList {...props} />
           <TouchableOpacity style={styles.back} onPress={()=>{Onclick()}}>
    <View style={styles.btn}>
      <Text style={styles.btnText}>Logout</Text>
    </View>
  </TouchableOpacity>
           </View>
       </DrawerContentScrollView>
       <View>
          
       </View>
      </View>
  );
}
const styles = StyleSheet.create({
      texts:{
        borderBottomColor:'black',
        borderBottomWidth:1
    },
      text:{
          color:'red',
          fontSize:20,
          textAlign:'center'
      },
     button:{
      //  marginRight:-20,
       alignItems:"flex-end",
       marginTop:hp(-3),
       backgroundColor:'#9932CC',
       width:wp(20),
       paddingVertical:hp(1),
       alignSelf:'flex-end',
       borderRadius:7,
      
      } ,
      back:{
        alignSelf: 'flex-start',
        // padding:10,
        // paddingTop:25,
        alignSelf: 'flex-start',
        marginTop:hp(3),
        marginLeft:wp(3)
      },
      btn: { width:wp(18), backgroundColor: '#9932CC',  borderRadius: 9, textAlignVertical:'center',paddingVertical:hp('0.7%') },
      btnText: { textAlign: 'center', color: '#fff',fontSize:hp('2%') },

  });