import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Registration from './components/authorization/Registration';
import Login from './components/authorization/Login';
import Splash from './components/layout/Splash';
import SuccessReg from './components/layout/SuccessReg';
import SuccessLogin from './components/layout/SuccessLogin';
import PostQuestion from './components/layout/PostQuestion';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component = {Splash}/>
          <Route exact path="/register" component = {Registration}/>
          <Route exact path="/postquestion" component = {PostQuestion}/>
          <Route exact path="/successreg" component = {SuccessReg}/>
          <Route exact path="/successlogin" component = {SuccessLogin}/>
          <Route exact path="/login" component = {Login}/>
        </div>
      </Router>
    );
  }
}

export default App;
