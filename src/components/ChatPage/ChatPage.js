import React, { useEffect } from 'react';
import './ChatPage.css';
import SidePanel from './SidePanel/SidePanel';
import MainPanel from './MainPanel/MainPanel';
import { useDispatch, useSelector } from 'react-redux';
import { onValue, getDatabase, ref } from 'firebase/database';
import { doRender } from '../../redux/actions/user_action';

const ChatPage = () => {
  const currentChatRoom = useSelector(state => state.chatRoom_reducer.currentChatRoom)
  const currentUser = useSelector(state => state.user_reducer.currentUser)
  const usersRef = ref(getDatabase(), 'users');
  const dispatch = useDispatch();

  useEffect(() => {
    onValue(usersRef, DataSnapshot => {
      dispatch(doRender());
    });
  }, []);

  return (
    <div id='chatPage' className='page-container'>
      <SidePanel key={currentUser && currentUser.uid}/>
      <MainPanel key={currentChatRoom && currentChatRoom.id}/>
    </div>
  )
}

export default ChatPage