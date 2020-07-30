import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import "./App.css";
import store from './store';
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER } from "./actions/types";
import { logoutUser } from "./actions/authActions";

//we are not writing the step for local storage becasue we already have token.
//Check for token
if(localStorage.jwtToken){
  //setAuth Header with the token
  setAuthToken(localStorage.jwtToken);
  //decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  //write user data to redux store. From app.js we say store.dispatch
  store.dispatch({
    type: SET_CURRENT_USER, 
    payload: decoded
  });
// Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href='/login';
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
// if we do not use export then it will not be able to use in other components
export default App;
