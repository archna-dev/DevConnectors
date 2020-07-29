import { SET_CURRENT_USER, GET_ERRORS } from './types';
import axios from 'axios';


//Register User, when the submit button in register is clicked then it is coming here.
export const registerUser = (userData, history) => dispatch => {
  //API which we are going to call and data which we want to pass
  axios
    .post('/api/users/register', userData)
    //setting a promise statement to see if the proxy call succeed or fails and in then we are checking what response we are getting in console.
    .then(res => history.push('/login'))
    //catch here is when axios call fails.  
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
}