import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SignInPage from './signInPage';

export default class InitPage extends React.Component {
  back = () => {
    ReactDOM.render(
      <SignInPage />,
      document.querySelector('#root')
    )
  }

  signUp = () => {
    let name = document.querySelector('#name').value;
    let password = document.querySelector('#password').value;
    axios.post('/user/signup', {
      Name: name,
      Password: password
    }).then(response => {
      document.querySelector('#status').innerHTML = 'Create successfully.';
      setTimeout(() => {
        this.switchToSignInPage();
      }, 2000);
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
          <button id='button1' onClick={ this.signUp }>Create Account</button>
          <button id='button2' onClick={ this.back }>Back</button>
        </div>
        <div class='status' id='status'></div>
      </div>
    );
  }
}
