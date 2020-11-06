import _ from 'lodash';
import {
    FETCH_STREAMS,
    FETCH_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';


export default (state={},action)=>{
    switch(action.type){
        case FETCH_STREAMS:
            //see example in copy..
            return {...state,..._.mapKeys(action.payload,'id')};

        case FETCH_STREAM:
            //this will take the id of the stream and put into state
            //and for that same id ...it will take the stream using action.payload
            return {...state,[action.payload.id]:action.payload};

            case 'CREATE_STREAM':
                return {...state, [action.payload.id]:action.payload};
            case EDIT_STREAM:
                return {...state, [action.payload.id]:action.payload};
            case DELETE_STREAM:
                //..we use lodash to delete the stream..
                //and since for delete payload is id..we only pass action.payload
                return _.omit(state,action.payload);
                default:
                    return state;
    }
};