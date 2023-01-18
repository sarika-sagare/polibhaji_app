/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import React,{Component,useState} from 'react';
import App from './App';
import Splash from './components/screens/loadingScreen';
import {name as appName} from './app.json';
import Main from './components/screens/loginScreen';
import notifee,{EventType,AuthorizationStatus} from '@notifee/react-native';
import { useNavigation } from '@react-navigation/native';

notifee.onBackgroundEvent(async({type,detail})=>{
    const {notification,pressAction}=detail;
    if(type===EventType.ACTION_PRESS && pressAction.id==='mark-as-read'){
        await notifee.cancelAllNotifications(notification.id)
    }

})




// class MainScreen extends Component {
//     constructor(props){
//         super(props);
//         this.state={currentScreen:'Splash'};
//         console.log('start doing screen')
//         setTimeout(()=>{
//             console.log('abcdef')
//             this.setState({currentScreen:'App'})
//         },1000)
//     }
//    render(){
//        const {currentScreen}=this.state
//        let mainS = currentScreen==='Splash' ? <Splash/> :<App/>
//        return mainS
//    } 
// }


// AppRegistry.registerComponent(appName, () => App);



AppRegistry.registerComponent(appName, () => App);
