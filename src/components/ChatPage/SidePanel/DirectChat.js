import React, { memo } from 'react';
import defaultProfile from '../../../utils/images/default_profile.png';

const DirectChat = ({users, handleActiveChatRoom, activeChatRoomId}) => {
  const renderUsers = (chatUsers) =>
    chatUsers.length > 0 &&
    chatUsers.map(chatUser => (
      <div 
        className={`${activeChatRoomId === chatUser.uid && 'active'} chat_item dm_chat_item`}
        key={chatUser.uid}
        onClick={() => {handleActiveChatRoom(chatUser, true)}}
      >
        <img className="profile-thumb" src={chatUser.image || defaultProfile} alt="프로필이미지"/>
        <div>
          <p className="chat_tit">{chatUser.name}</p>
        </div>
      </div>
  ))

  return (
    <div className='chat directChat'>
      {users && renderUsers(users)}
    </div>
  )
}

export default memo(DirectChat);