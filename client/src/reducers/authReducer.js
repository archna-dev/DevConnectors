import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validations/is-empty';

const initialState = {
  //users who are coming to my application assuming they are not logged in hence giving the following line.
  isAuthenticated: false,
  user: {}
};


export default function (state=initialState, action){
  switch(action.type){
    case SET_CURRENT_USER:
      return{
        ...state,
        user:action.payload,
        isAuthenticated: !isEmpty(action.payload)
      }
    default:
      return state;
  }
};
