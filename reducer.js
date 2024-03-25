
"use client"
export const initialState={
    providers:{},
    accounts:'',
    contracts:{}
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
        default:
            return state
    }    
}
export default reducer;
