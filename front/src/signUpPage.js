import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import InitPage from './initPage';

export default class SignUpPage extends React.Component {
  back = () => {
    ReactDOM.render(
      <InitPage />,
      document.querySelector('#root')
    );
  };

  signUp = () => {
    let name = document.querySelector('#name').value;
    let password = document.querySelector('#password').value;
    axios.post('/user/signup', {
      Name: name,
      Password: password
    }).then(response => {
      document.querySelector('#msg').innerHTML = 'Create successfully.';
    }).catch(error => {
      document.querySelector('#msg').innerHTML = error.response.data;
    });
  };

  render() {
    return (
      <div>
        <button id='back' onClick={() => { this.back() }}>Back</button>
        <div>
          <div>Name</div> <input type='text' id='name' />
        </div>
        <div>
          <div>Password</div> <input type='text' id='password' />
        </div>
        <button id='create' onClick={() => { this.signUp() }}>Create</button>
        <div id='msg'></div>
      </div>
    )
  }
}
