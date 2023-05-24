import React from 'react';
import './ChatPage.css';
import SidePanel from './SidePanel/SidePanel';
import MainPanel from './MainPanel/MainPanel';
import { useSelector } from 'react-redux';

const ChatPage = () => {
  const currentChatRoom = useSelector(state => state.chatRoom_reducer.currentChatRoom)
  const currentUser = useSelector(state => state.user_reducer.currentUser)

  return (
    <div id='chatPage' className='page-container'>
      <SidePanel key={currentUser && currentUser.uid}/>
      <MainPanel key={currentChatRoom && currentChatRoom.id}/>
    </div>
  )
}

export default ChatPage