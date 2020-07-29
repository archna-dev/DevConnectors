import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import classnames from 'classnames';


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
    //API which we are going to call and data which we want to pass
    axios.post('api/users/login', user)
      //setting a promise statement to see if teh proxy call succeed or fails and in then we are checking what response we are getting in console.
      .then(res => console.log(res))
      //catch here is when axios call fails.  
      .catch(err => this.setState({ errors: err.response.data }))
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
                    A simple, fun & creative way to connect with friends & family.
                  </p>
                  <hr />
                
                  <div className="login">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-8 m-auto">
                          <p className="lead text-center">
                            Sign in to your InstaConnect account
                          </p>
                          <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                              <input
                                type="email"
                                className={classnames("form-control form-control-lg", {
                                  "is-invalid": errors.email,
                                })}
                                placeholder="Email Address"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                              />
                              {errors.email && (
                                <div className="invalid-feedback"> {errors.email}</div>
                              )}
                            </div>
                            <div className="form-group">
                              <input
                                type="password"
                                className={classnames("form-control form-control-lg", {
                                  "is-invalid": errors.password,
                                })}
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                              />
                              {errors.password && (
                                <div className="invalid-feedback"> {errors.password}</div>
                              )}
                            </div>
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
                    <img src="./img/landing-page.JPG" alt="" />
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

export default Landing;