import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import axios from 'axios';
import classnames from 'classnames';
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";



class Landing extends Component {
  constructor() {
    //Following will be saved in local state and not storing in database
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(user);
  }
    componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
    //API which we are going to call and data which we want to pass
   // axios.post('api/users/login', user)
      //setting a promise statement to see if teh proxy call succeed or fails and in then we are checking what response we are getting in console.
     // .then(res => console.log(res))
      //catch here is when axios call fails.  
      //.catch(err => this.setState({ errors: err.response.data }))
       componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  
  render() {
    const { errors } = this.state; 
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="col-md-6">
                  <h2 className="display-3 mb-4">InstaConnect</h2>
                  <p className="lead1">
                    A simple, fun & creative way to connect with friends &
                    family.
                  </p>
                  <hr />

                  <div className="login">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12 m-auto">
                          <p className="lead text-center">
                            Sign in to your InstaConnect account
                          </p>
                          <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                              <TextFieldGroup
                                placeholder="Email Address"
                                name="email"
                                type="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                error={errors.email}
                              />
                              </div>
                          
                            <div className="form-group">
                                  <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    error={errors.password}
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                                </div>
                              )
                        
                            <input
                              type="submit"
                              className="btn btn-info btn-block mt-4"
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />

                  <p>
                    Don't have an account? &nbsp;
                    <Link to="/register" className="btn btn-lg btn-info mr-2">
                      Sign Up
                    </Link>
                  </p>
                </div>
                <div className="col-md-6">
                  <div className="image">
                    <img src="./img/landing-page.JPG" alt="" width="50%" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Landing.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Landing);
