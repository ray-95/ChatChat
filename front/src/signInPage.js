import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ChatPage from './chatPage';
import SignUpPage from './signUpPage';

export default class SignInPage extends React.Component {
  signUp = () => {
    ReactDOM.render(
      <SignUpPage />,
      document.querySelector('#root')
    )
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
      document.querySelector('#status').innerHTML = error.response.data;
    });
  };

  render() {
    return (
      <div class='initPage'>
        <link rel="stylesheet" type="text/css" href="initPage.css"></link>
        <div class='initPage-main'>
          <div class='title'>
            Chat Chat
          </div>
          <br/>
          <div class='inputs'>
            <div class='input-title'>
              Username
            </div>
            <input class='input-content' id='name'/>
          </div>
          <div class='inputs'>
            <div class='input-title'>
              Password
            </div>
            <input class='input-content' id='password'/>
          </div>
          <br/>
          <button id='button1' onClick={ this.signIn }>Sign In</button>
          <button id='button2' onClick={ this.signUp }>Sign Up</button>
        </div>
        <div class='status' id='status'></div>
      </div>
    );
  }
}
