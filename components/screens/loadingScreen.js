import React,{useState,useEffect,useCallback} from 'react'
import { View, StyleSheet,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch} from 'react-redux';
import { isAdmin,isEmployee} from './redux/actions/users';

export default function LoadingScreen({navigation}){
    
  useFocusEffect(
    useCallback(() => {

      // dispatch(resetState());
      
    },[])
    )
    const [token,setToken]=useState('')
    const dispatch = useDispatch();
    const [isLoading,setLoading]=useState(true)
    async function RetrieveUserData() {
       let d = await AsyncStorage.getItem('token');
       let user = await AsyncStorage.getItem('user');
     if (d){
         if (user=='admin'){
          console.log('admin user')
          dispatch(isAdmin(1))

        }
         if (user=='employee'){
          dispatch(isAdmin(0))

        }
        navigation.navigate("Drawer")
        setToken(d)   
        setLoading(false)
     }
     else{
        navigation.navigate("Main")
         setToken(null)
         setLoading(false)
     }
   }
   useEffect(()=>{
     RetrieveUserData();
     
     },[])

    return(
    <View style={{ flex: 1}}>
        {isLoading && <ActivityIndicator size="large" />}
    </View>
    )

}


const styles = StyleSheet.create({
     texts:{
      borderBottomColor:'black',
      borderBottomWidth:1
  },
  label:{
      fontSize:15,
      color:'black',
      
  },
  main:{
    padding:2,
    margin:2,
  }
  });