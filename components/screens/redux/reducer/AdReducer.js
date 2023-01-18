import { IsAdmin , IsEmployee, IsLogin,Get_Count,Reset_State,Count} from "../actions/types";

const initialState = {
  Admin: 0,
  tokens:(''),
  ct:[{}],
  usr:[{}],
  policount:'',
  bhakaricount:'',
  tea:false,
  snacks:false
}

const AdReducer = (state = initialState, action) => {
  switch (action.type) {
    case IsAdmin:
      return {
           ...state,
          Admin:action.payload.Admin
      };
     case IsEmployee:
       return{
         Admin:0
       } 
    case Get_Count:{
      return {...state, ct:action.payload};
    }
    case Count:
      return {
           ...state,
          Admin:action.payload.Admin,
          policount:action.payload.policount,
          bhakaricount:action.payload.bhakaricount,
          tea:action.payload.tea,
          snacks:action.payload.snacks,
      };
    case Reset_State:
      return{
        ...state,
        Admin:initialState.Admin,
        tokens:initialState.tokens,
        policount:initialState.policount,
        bhakaricount:initialState.bhakaricount,
        tea:false,
        snacks:false,
      }
    default:
      return state;
  }
}

export default AdReducer;