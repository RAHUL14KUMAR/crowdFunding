
"use client"
export const initialState={
    providers:{},
    accounts:"0x048a33def606db075f4cbc2f2ed7d313af8e1267",
    contracts:{},
    get:[],
    user:[]
}

const reducer=(state,action) => {
    // console.log("action>>>>",action); 

    switch(action.type){
        case "SET_ACCOUNT":
            return {
                ...state,
                accounts: action.account,
            };

        case "SET_PROVIDER":
            return {
                ...state,
                providers: action.providers,
            };

        case "SET_CONTRACT":
            return{
                ...state,
                contracts:action.contract
            }
        case "GET_ALL_COMPAIGN":
            return{
                ...state,
                get:action.get
            }

        case "SET_USER_COMPAIGN":
            return{
                ...state,
                user:action.user
            }
        default:
            return state
    }    
}
export default reducer;
