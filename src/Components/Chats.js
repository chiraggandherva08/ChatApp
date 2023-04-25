import './style.css';
import React, { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai';
import LoadingAnimation from './LoadingAnimation';

const chatGPT_Response = (userQuery, allMessages, setAllMessages) => {

  document.querySelector(".user-message").style.display = 'none';
  document.querySelector(".loading-animation").style.display = 'flex';
  
  const openai = new OpenAIApi(new Configuration({
    apiKey: "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"
  }))
  const userinput = {
    model: "gpt-3.5-turbo",
    messages: [{
      role: "user", content: userQuery
    }]
  };
  
  openai.createChatCompletion(userinput).then((chatGPT_Response) => {
    const response = chatGPT_Response.data.choices[0].message.content;
    
    document.querySelector(".user-message").style.display = 'flex';
    document.querySelector(".loading-animation").style.display = 'none';
    
    const newMessages = [...allMessages, userQuery, response];
    setAllMessages(newMessages);
  });
}

const Chats = () => {

  const changeTheme = () => {
    document.body.classList.toggle("toggle-body-theme");
    document.querySelector('.App').classList.toggle("toggle-chat-app");

    document.querySelector(".chat").classList.toggle("toggle-chat-theme");
  }

  const getTime = () => {
    const Date_ = new Date();
    const Time = {
      hour: Date_.getHours(),
      minute: Date_.getMinutes(),
    }

    if (Time.hour > 12) {
      return ` ${Time.hour}:${Time.minute} PM `;
    }
    return ` ${Time.hour}:${Time.minute} AM `;
  }

  const Messages = [];
  const [allMessages, setAllMessages] = useState(Messages);

  const clearChat = () => {
    setAllMessages([]);
  }

  const sendQuery = () => {
    let usrMsg = document.querySelector(".user-message").value;
    usrMsg = usrMsg.trim();
    
    if (!usrMsg) {
      return;
    }

    if (usrMsg == 'change theme') {
      changeTheme();
      return;
    }
  
    const newMessages = [...allMessages, usrMsg];
    setAllMessages(newMessages);
    chatGPT_Response(usrMsg, allMessages, setAllMessages);
    document.querySelector(".user-message").value = "";
  }

  return (
    <div className='chat'>

      <ul className="chats">
      <li className='new-chat-started'>
        New Chat started at {getTime()}
      </li>
        {
          allMessages.map((message, index) => {
            return (
              <li className='messages' key={index}>
                <p className='message-text'>{message}</p>
                <p className='message-time'>{getTime()}</p>
              </li>
            )
          })
        }
      </ul>

      <div className="user-input">
        <input className='user-message' type="text" placeholder='.....' />
        <LoadingAnimation/>
        <button className='send-btn' onClick={() => { sendQuery() }}>Send?</button>

        <div className="clear-chat">
          <img src="./Assets/erase-chat.svg" onClick={() => {clearChat()}} />
        </div>
      </div>
    </div>
  )
}

export default Chats;
