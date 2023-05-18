import React from 'react';
import './ChatPage.css';
import SidePanel from './SidePanel/SidePanel';
import MainPanel from './MainPanel/MainPanel';

const ChatPage = () => {

  return (
    <div id='chatPage' className='page-container'>
      <SidePanel />
      <MainPanel />
    </div>
  )
}

export default ChatPage