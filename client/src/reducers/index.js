import { combineReducers } from "redux";
import authReducer from "./authReducer";
import store from "../store";

export default combineReducers({
  auth: authReducer
});


