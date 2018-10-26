import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const existingUser = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post('/api/users/login', existingUser)
      .then(res => {
        // Save to Local Storage
        const { token } = res.data;
        // Set the token to Local Storage
        localStorage.setItem('jwtToken', token)
        // Set Token to Auth header
        setAuthToken(token);

        const decoded = jwt_decode(token);
        console.log("User: ", decoded);
        localStorage.setItem('UserID', decoded.id);
        localStorage.setItem('name', decoded.name);
        this.props.history.push('/successlogin');
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Welcome Quack!</h1>
              <p className="lead text-center">
                Login to your FullQuack Account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email
                    })}
                    placeholder="Your Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
