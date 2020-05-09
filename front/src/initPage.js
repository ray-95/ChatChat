import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SignUpPage from './signUpPage';
import ChatPage from './chatPage';

export default class InitPage extends React.Component {
  signUp = () => {
    ReactDOM.render(
      <SignUpPage />,
      document.querySelector('#root')
    );
  }

  signIn = () => {
    let name = document.querySelector('#name').value;
    let password = document.querySelector('#password').value;
    axios.post('/user/signin', {
      Name: name,
      Password: password
    }).then(response => {
      console.log(response.data);
      ReactDOM.render(
        <ChatPage user_name={name} jwtToken={response.data}/>,
        document.querySelector('#root')
      );
    }).catch(error => {
      document.querySelector('#msg').innerHTML = error.response.data;
    });
  };

  render() {
    return (
      <div>
        <button id='signUp' onClick={() => { this.signUp() }}>Sign Up</button>
        <div>
          <div>Name</div> <input id='name'></input>
        </div>
        <div>
          <div>Password</div> <input id='password'></input>
        </div>
        <button id='signin' onClick={() => { this.signIn() }}>Sign In</button>
        <div id='msg'></div>
      </div>
    )
  }
}
