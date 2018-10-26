import React, { Component } from 'react';

class SuccessLogin extends Component {
  constructor() {
    super();
    this.state = {
      name: localStorage.getItem('name')
    };
  }
  render() {
    return (
      <div className="successLogin-container">
        <h2>{this.state.name} successfully Logged in!</h2>
      </div>

    )
  }
}

export default SuccessLogin;