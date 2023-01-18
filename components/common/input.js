import {Text, TextInput, View, StyleSheet} from 'react-native';
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol,
  } from 'react-native-responsive-screen';

function Input({label,textInputConfig}){
    return(
        <View style={styles.main}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.texts} {...textInputConfig}/>
        </View>
    )
}
export default Input;
const styles = StyleSheet.create({
     texts:{
      borderColor:'#BCC6CC',
      borderBottomColor:'black',
      borderBottomWidth:1,
      color:'black',
      borderWidth: 2,
      borderRadius: 9,
      justifyContent: 'center',
    //   padding:hp('1%'),
      fontSize:hp('2%'),
      marginHorizontal:wp(1),
      height:hp(6)
  },
  label:{
      fontSize:hp('2.5%'),
      color:'black',
      marginLeft:wp(1)  
  },
  main:{
    padding:2,
    margin:2,
  }
  });