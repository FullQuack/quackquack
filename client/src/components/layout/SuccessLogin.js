import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class SuccessLogin extends Component {
  constructor() {
    super();
    this.state = {
      name: localStorage.getItem('name'),
      posts: [],
    };
  
  }


  componentDidMount() {
    axios
      .get('/api/posts/')
      .then(res => { 
        this.setState({posts: res.data})
        console.log(res.data);
       })
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    let allPosts = [];
    for (let i = 0; i < this.state.posts.length; i++) {
      let date = new Date(Date.parse(this.state.posts[i].date));
      let dateObject = new Date(Date.parse(date));
      let dateReadable = dateObject.toDateString();
      allPosts.push(<div className='question_container' key={i}>{this.state.posts[i].text} --{this.state.posts[i].name} {dateReadable}</div>);
      if(this.state.posts[i].tags !== ''){
        let tags = this.state.posts[i].tags;
      }
    }
    return (
      <div className='successLogin-container'>
      
      <video id='gum' playsinline autoplay muted></video>
      <video id='recorded' playsinline loop></video>
  
      <div>
          <button id='start'>Start camera</button>
          <button id='record' disabled>Start Recording</button>
          <button id='play' disabled>Play</button>
          <button id='download' disabled>Download</button>
      </div>
      
        <h2>{this.state.name} successfully Logged in!</h2>
        <Link to='/postquestion' className = 'btn btn-lg btn-light'>
          Quack a new Question!
        </Link>
        <div>
        {allPosts}
        </div>
      </div>

    )
  }
}

export default SuccessLogin;