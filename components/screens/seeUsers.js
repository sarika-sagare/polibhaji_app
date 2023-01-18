import React, { useState ,useCallback} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert,ActivityIndicator,ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { seeUsers,UserDelet} from '../constants/apis';
import RetrieveData from '../common/utilFunctions';
import { useFocusEffect } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';


export default function Userslist({navigation}) {
const tableHead= ['Employee','Reset','Delete'];
let tableData= [[1,2,3]]
const [details,setDetails]=useState([])
const [isLoading, setLoading] = useState(true);

async function getDetails(){
  const token=await RetrieveData();
  fetch(seeUsers,{
    method: 'get', 
    headers: new Headers({
      // 'Authorization': 'Basic '+base64.encode("shubhampatil" + ":" +"shubhampatil"), 
      'Content-Type': 'application/json',
      'Authorization': 'token '+token,
    }),
  }).then((response) =>response.json()) // get response, convert to json
  .then((json) => {
        setDetails(json.data)
        setLoading(false)
      })
  .catch((error) => alert(error))
}

async function ConfirmDelete(id){
  const token=await RetrieveData();
  fetch(UserDelet+id+"/",{ 
    method: 'delete', 
    headers: new Headers({
      'Authorization': 'token '+token, 
      'Content-Type': 'application/json' 
    }), 
  }).then(res=>res.json()).then((response)=>{
  
    if(response.success==true){
      getDetails();
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
useFocusEffect(
  useCallback(()=>{
    getDetails();
  },[])
)

const element1 = (id,name) => (
    <TouchableOpacity onPress={() => ConfirmDelete(id)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>Delete</Text>
      </View>
    </TouchableOpacity>
  )

const element = (id,name) => (
      <TouchableOpacity onPress={() => navigation.navigate('userPassword',{Iid:id,name:name})}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Reset</Text>
        </View>
      </TouchableOpacity>
)

  if (typeof details === 'object'){
     tableData=details.map(item => ([item.username,element(item.id,item.username),element1(item.id,item.username)]));
  }else{
    tableData=[[0,0,0]]
  }

return (
      <View style={styles.container}>
        {isLoading && <ActivityIndicator size="large" />}
        <Text style={styles.headText}>Employee List</Text>
        <ScrollView>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.texth}/>
          {
            tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    // <Cell key={cellIndex} data={cellIndex == 1 || cellIndex==2 ? element(cellData, cellData) : cellData} textStyle={styles.text}/>
                    <Cell key={cellIndex} data={cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
        </ScrollView>
      </View>
  
    )
  }

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30,},
  head: { height: hp(4), backgroundColor: '#808B97' },
  texth: {fontWeight:'bold',textAlign:'center',fontSize:hp(2.5),color:'black'},
  text: { margin: 6,textAlign:'center',fontSize:hp(2.5),color:'black'},
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1',borderColor:'black',borderWidth:1,},
  btn: { width: hp(6),  backgroundColor: '#78B7BB',  borderRadius: 2,alignSelf:'center',paddingVertical:hp(0.5) },
  btnText: { textAlign: 'center', color: '#fff',fontSize:hp(1.5) },
  headText:{textAlign: 'center',paddingBottom:12,fontWeight:'bold',fontSize:27,fontStyle:'italic',color:'black'}
});

