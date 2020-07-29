  import {GET_ERRORS} from '../actions/types'; //this is one of the dispatch.

  //the data this is going to write
  const initialState = {};

  export default function (state = initialState, action){
    switch(action.type){
      case GET_ERRORS: 
        return action.payload;
    
      default:
        return state;
    }
  }