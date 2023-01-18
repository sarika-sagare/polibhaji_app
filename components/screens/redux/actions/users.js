import { IsAdmin, IsEmployee, IsLogin,Get_Count,Reset_State,Count} from './types';
import { count} from '../../../constants/apis';



// function getCount(){
//   fetch(count,{
//     method: 'get', 
//     headers: new Headers({
//       // 'Authorization': 'Basic '+base64.encode("shubhampatil" + ":" +"shubhampatil"), 
//       'Content-Type': 'application/json',
//       'Authorization': 'token 5f027fabe0991d897c6bba673cdae13ccc5d62d8',
//     }),
//   }).then((response) =>response.json()) // get response, convert to json
//     .then((json) => {
//       console.log('cot is',json)
//       setPolicount(json.data.total_poli_count);
//       setBhakariCount(json.data.total_bhakari_count);
//       setEmployee(json.data.total_employees_count_for_lunch);
//       setsnacks(json.data.total_snaks_count);
//       setTea(json.data.total_tea_count);
//     })
//     .catch((error) => alert(error)) // display errors
// }


export const isAdmin = (val) => dispatch=>{
  console.log('isadmin value is',val)
  dispatch(
  {
    type: IsAdmin,
    payload:{
      Admin:val
    }
    
  })
};


export const isCount = (c1,c2,c3,c4) => dispatch=>{
  console.log('iscount',c1,c2,c3,c4)
  dispatch(
  {
    type: IsAdmin,
    payload:{
      policount:c1,
      bhakaricount:c2,
      tea:c3,
      snacks:c4,
      
    }
    
  })
};



export const isEmployee = () => (
  {
    type: IsEmployee,
  }
);

export const resetState = () => {
  console.log("states reset")
  return (dispatch) => {
    dispatch({
      type: Reset_State,
    });
   
  };
};

export const getCounts=()=>{
  try{
    return async dispatch=>{
      const result = await fetch(count,{
        method: 'get', 
        headers: new Headers({
              // 'Authorization': 'Basic '+base64.encode("shubhampatil" + ":" +"shubhampatil"), 
                 'Content-Type': 'application/json',
                 'Authorization': 'token 5f027fabe0991d897c6bba673cdae13ccc5d62d8',
             }),
      });
      const json=await result.json();
      if (json){
        dispatch({
          type:Get_Count,
          payload:json
        });
      }else{
        console.log('unable to fetch')
      }
    }

  }catch(error){
      console.log(error)
  }
}

