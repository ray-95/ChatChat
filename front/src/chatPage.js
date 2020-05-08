import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import InitPage from './initPage';

export default class ChatPage extends React.Component {
  signOut = () => {
    ReactDOM.render(
      <InitPage />,
      document.querySelector('#root')
    );
  }

  send = () => {
    let receiver = document.querySelector('#receiver').value;
    let content = document.querySelector('#content').value;
    let date = new Date();
    let time = date.getTime();
    axios.post('/message', {
      Receiver: receiver,
      Sender: this.props.user_name,
      Content: content,
      Time: time
    }).then(response => {
      console.log(response);
      document.querySelector('#sendStatus').innerHTML = 'Send successfully';
      let newMsgTime = document.createElement('div');
      newMsgTime.innerHTML = date.toLocaleTimeString();
      var newMsgContent = document.createElement('div');
      newMsgContent.innerHTML =
        'To ' + receiver + ': ' + content;
      document.querySelector('#msgList').appendChild(newMsgTime);
      document.querySelector('#msgList').appendChild(newMsgContent);
    }).catch(error => {
      document.querySelector('#sendStatus').innerHTML = error.response.data;
    });
  };

  render() {
    return (
      <div>
        <div>
          {this.props.user_name}
          <button id='signout' onClick={() => { this.signOut() }}>Sign Out</button>
        </div>
        <div>
          <div>Send To</div>
          <input type='text' id='receiver' />
        </div>
        <div>
          <div>Content</div>
          <input type='text' id='content' />
        </div>
        <div>
          <button id='send' onClick={() => { this.send() }}>Send</button>
          <div id='sendStatus'> </div>
        </div>
        <div id='msgList'>Message List</div>

        <script>
          window.onload = () => {
            setInterval(() => {
              axios.get('/message/' + this.props.user_name)
              .then(response => {
                response.data.forEach(message => {
                  let newMsgTime = document.createElement('div');
                  newMsgTime.innerHTML = new Date(message['time']).toLocaleTimeString();
                  var newMsgContent = document.createElement('div');
                  newMsgContent.innerHTML =
                    'From ' + message['sender'] + ': ' + message['content'];
                  document.querySelector('#msgList').appendChild(newMsgTime);
                  document.querySelector('#msgList').appendChild(newMsgContent);
                });
              })
            }, 200)
          }
        </script>
      </div>
    )
  }
}