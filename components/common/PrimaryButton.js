import {View,Text,Pressable,StyleSheet} from 'react-native';
import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol,
  } from 'react-native-responsive-screen'

function PrimaryButton(props){
    return(
        <View style={styles.buttonOuter}>
    <Pressable style={({pressed})=>pressed ? [styles.container,styles.pressed]: styles.buttonOuter} 
       android_ripple={{color:'#228B22'}} onPress={props.onPressfun} >
        <Text style={styles.buttonText}>{props.children}</Text>
    </Pressable>
    </View>
)
}

export default PrimaryButton;

const styles = StyleSheet.create({
    container:{
        margin:10,
        backgroundColor:'green',
        // paddingVertical:hp(7),
        paddingHorizontal:14,
        elevation:2,

    },
    buttonText:{
        color:'white',
        fontWeight:'bold',
        textAlign:'center',
        fontSize:hp('2%')
    },
    buttonOuter:{
        borderRadius:20,
        backgroundColor:'green',
        padding:hp(1),
        overflow:'hidden',
        marginHorizontal:wp(2),
    },

    pressed:{
      opacity:0.75
    }
})