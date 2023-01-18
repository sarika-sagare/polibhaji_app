import React, { useCallback,useState} from 'react';
import { StyleSheet, View, ScrollView, Text,ActivityIndicator } from 'react-native';
import { Table, Row,Cell,TableWrapper } from 'react-native-table-component';
import { count,count_list} from '../constants/apis';
import { useFocusEffect } from '@react-navigation/native';
import RetrieveData from '../common/utilFunctions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';

export default function SeeCount() {
  const tableHead= ['Employee', 'Chapati', 'Bhakari', 'Snaks','Tea',];
    const widthArr= [100,80,80,60,60] ;
    const [isLoading, setLoading] = useState(true);
    const [policout,setPolicount] = useState()
    const [bhakariCount,setBhakariCount]=useState()
    const [Employee,setEmployee]=useState()
    const [snacks,setsnacks]=useState()
    const [tea,setTea]=useState()
    const [details,setDetails]=useState([])
    let tableData = [[]]
 async function getDetails(){
    const token=await RetrieveData();
    setLoading(true)
  fetch(count,{
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token '+token,
    }),
  }).then((response) =>response.json()) // get response, convert to json
  .then((json) => {
        setPolicount(json.data.total_poli_count)
        setBhakariCount(json.data.total_bhakari_count)
        setEmployee(json.data.total_employees_count_for_lunch)
        setsnacks(json.data.total_snaks_count)
        setTea(json.data.total_tea_count)
        setLoading(false)
      })
  .catch((error) => alert(error))
}
async function getCount(){
  setLoading(true)
  const token=await RetrieveData();
  fetch(count_list,{
    method: 'get',
    headers: new Headers({
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
useFocusEffect(
  useCallback(()=>{
    getDetails();
    getCount();
  },[])
)
    if (typeof details === 'object'){
       tableData=details.map(item => ([item.user.username,item.poli_count,item.bhakari_count,+item.snaks,+item.tea]));
    }else{
      tableData=[[0,0,0,0,0]]
    }
return (
    <ScrollView style={{flex:1}}>
    {isLoading && <ActivityIndicator size="large" />}
    <Text style={styles.MainText}>Todays Total count :</Text>
    <Text style={styles.subText}>Employees:{Employee}</Text>
    <Text style={styles.subText}>Chapati:{policout}</Text>
    <Text style={styles.subText}>Bhakari:{bhakariCount}</Text>
    <Text style={styles.subText}>Snack:{snacks}</Text>
    <Text style={styles.subText}>Tea:{tea}</Text>
    <View style={styles.container}>
    <Text style={styles.MainText}>Count Table</Text>
    </View>
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
     </ScrollView>
     )
        }
     const styles = StyleSheet.create({
    container: {padding: 16, paddingTop:30, backgroundColor: '#fff' },
    head: { height: hp(7), backgroundColor: 'blue' },
    texth: { textAlign: 'center', fontWeight:'bold',fontSize:wp(3.5),color:'white'},
    text: { textAlign: 'center',fontSize:wp(4),color:'black'},
    dataWrapper: { marginTop: -1 },
    row: { flexDirection:'row', backgroundColor: '#E7E6E1' } ,
    MainText:{textAlign:"left",fontWeight:"600",fontSize:hp(3),paddingBottom:10,color:'black'},
    subText:{fontSize:hp(2), fontWeight:"500",color:'black'}
});
