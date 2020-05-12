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
    axios({
      method: 'post',
      url: '/message',
      headers: {
        Authorization: 'Bearer ' + this.props.jwtToken
      },
        data: {
        Receiver: receiver,
        Sender: this.props.user_name,
        Content: content,
        Time: time
      }
    }).then(response => {
      // console.log(response);
      // document.querySelector('#sendStatus').innerHTML = 'Send successfully';

      let newMsg = document.createElement('div');
      newMsg.className = 'msg';
      newMsg.innerHTML = date.toLocaleTimeString() + 
        '<br/>To ' + receiver + ': ' + content;

      let newRightMsg = document.createElement('div');
      newRightMsg.className = 'right-msg';
      newRightMsg.appendChild(newMsg);
      
      let chatBox = document.querySelector('#chatBox');
      chatBox.appendChild(newRightMsg);
      chatBox.appendChild(document.createElement('br'));
      chatBox.scrollTop = chatBox.scrollHeight;
    }).catch(error => {
      // console.log(error.response.data);
      // document.querySelector('#sendStatus').innerHTML = error.response.data;
    });
  };

  render() {
    return (
      <div>
        <div className='chatPage-header'>
          <div>
            Hi, {this.props.user_name}
            <button id='signout' onClick={() => { this.signOut() }}>Sign Out</button>
          </div>
          Send to <input type='text' id='receiver'/>
        </div>
      
        <div className='chatPage-main' id='chatBox'></div>
        
        <div className='chatPage-footer'>
          <input className='editor' type='text' id='content'/>
          <button className='sendButton' onClick={() => { this.send() }}>
            Send
          </button>
        </div>

        <script>
          window.onload = () => {
            setInterval(() => {
              axios({
                method: 'get',
                url: '/message/' + this.props.user_name,
                headers: {
                  Authorization: 'Bearer ' + this.props.jwtToken
                }
              }).then(response => {
                console.log(response);
                response.data.forEach(message => {
                  let newMsg = document.createElement('div');
                  newMsg.className = 'msg';
                  newMsg.innerHTML = new Date(message['time'])
                  .toLocaleTimeString() + '<br/>From ' + message['sender'] +
                  ': ' + message['content'];

                  let newLeftMsg = document.createElement('div');
                  newLeftMsg.className = 'left-msg';
                  newLeftMsg.appendChild(newMsg);

                  let chatBox = document.querySelector('#chatBox');
                  chatBox.appendChild(newLeftMsg);
                  chatBox.appendChild(document.createElement('br'));
                  chatBox.scrollTop = chatBox.scrollHeight;
                })
              })
            }, 200)
          }
        </script>
      </div>
    )
  }
}