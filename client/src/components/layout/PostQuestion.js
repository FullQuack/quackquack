import React, { Component } from 'react';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';


class PostQuestion extends Component {
  constructor() {
    super();
    this.state = {
      name: localStorage.getItem('name'),
      question: "",
      tags: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newPost = {
      name: this.state.name,
      text: this.state.question,
      tags: this.state.tags,
    };
    setAuthToken(localStorage.getItem('jwtToken').split(" ")[1]);
    axios
      .post('/api/posts/', newPost)
      .then(res => { 
        console.log(res.data);
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
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Quacked Question"
                  name="question"
                  value={this.state.question}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Tags (i.e., Javascript, Google Interview, React Dev)"
                  name="tags"
                  value={this.state.tags}
                  onChange={this.onChange}
                />
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


export default PostQuestion;