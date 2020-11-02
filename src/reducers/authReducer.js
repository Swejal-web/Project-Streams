const INITIAL_STATE={       //true constant and do not try to modify in any way.

    isSignedIn:null,
    userId:null
};
export default (state= INITIAL_STATE,action)=>{
    switch(action.type){
        case 'SIGN_IN':
            return {...state,isSignedIn:true,userId:action.payload};
        case 'SIGN_OUT':
            return {...state,isSignedIn:false,userId:null};
        default:
            return state;
    }
};