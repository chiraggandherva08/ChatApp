import React from 'react'

const ChatList = () => {

  let isToggledTheme = false;
  const changeTheme = () => {
    if (!isToggledTheme) {
      document.querySelector(".change-theme").src = './Assets/light.svg';
      document.querySelector(".change-theme").classList.toggle('rotate-icon');

      isToggledTheme = !isToggledTheme;
    }
    else {
      document.querySelector(".change-theme").src = './Assets/dark.svg';
      document.querySelector(".change-theme").classList.toggle('rotate-icon');
      isToggledTheme = !isToggledTheme;
    }
    document.body.classList.toggle("toggle-body-theme");
    document.querySelector('.App').classList.toggle("toggle-chat-app");

    document.querySelector(".chat").classList.toggle("toggle-chat-theme");
  }

  return (
    <ul className='chat-list'>
        <li className='navigation-btns'>
            <img className='change-theme' src="./Assets/dark.svg" onClick={() => {changeTheme()}} />
        </li>
    </ul>
  )
}


export default ChatList;