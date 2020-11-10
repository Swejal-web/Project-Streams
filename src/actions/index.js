import stream from '../api/stream';
import history from '../history';
import {

    FETCH_STREAM,
    FETCH_STREAMS,
    DELETE_STREAM,
    EDIT_STREAM
}from './types';

export const signIn=(userId)=>{
    return{
        type:'SIGN_IN',
        payload:userId
    };
};

export const signOut=()=>{
    return{
        type:'SIGN_OUT'
    };
};
//when we return a function for action creator..the function gets automatically
//called by redux thuk with two argumements..disptach and getstate
//getstate allows us to reach into redux store and pull information about uerId

export const createStream = formValues=>async (dispatch,getState)=>{
    const {userId} = getState().auth;
    const response = await stream.post('/streams',{...formValues,userId});

    dispatch({type:'CREATE_STREAM' , payload:response.data});
    //Do some programmatic navigation to get the user 
     //back to the root route
    history.push("/");
    };

export const fetchStreams = ()=>async dispatch=>{
    const response= await stream.get('/streams');

    dispatch({type: FETCH_STREAMS , payload:response.data});
};
export const fetchStream=(id)=>async dispatch=>{
    const response = await stream.get(`/streams/${id}`);

    dispatch({type: FETCH_STREAM , payload:response.data});
    
};

export const editStream =(id,formValues) => async dispatch=>{
   //we use patch instead of put because put replaces all previous properties with the new one
   //patch is used to make chnages in some properties among large number of other properties
    const response = await stream.patch(`/streams/${id}`,formValues);
    dispatch({type:EDIT_STREAM , payload:response.data});
    history.push("/");
};

export const deleteStream =(id)=>async dispatch=>{
    //it does not gives back anything so no need of response
    await stream.delete(`/streams/${id}`);

    dispatch({type:DELETE_STREAM,payload:id});
    history.push("/");
}
