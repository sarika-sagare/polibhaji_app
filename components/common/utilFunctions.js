// import React from'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function RetrieveData() {
  let d = await AsyncStorage.getItem('token');
  if (d){
  return d
  }
  
}  

export default RetrieveData