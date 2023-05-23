import React, { memo } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import defaultProfile from '../../../utils/images/default_profile.png';

const OpenChat = ({chatRooms, isRender, activeChatRoomId, handleActiveChatRoom}) => {

  const renderChatRooms = (rooms) =>
    rooms.length > 0 &&
    rooms.map(room => (
      <div 
        className={`${activeChatRoomId === room.id && 'active'} chat_item open_chat_item`} 
        key={room.id} 
        onClick={() => {handleActiveChatRoom(room, false)}}>
        <OverlayTrigger 
          placement="top" 
          overlay={
            <Tooltip>
              {room.createdBy.name}님이 개설한 방입니다.
            </Tooltip>
          }
        >
          <img className="profile-thumb" src={room.createdBy.image || defaultProfile} alt="프로필이미지"/>
        </OverlayTrigger>
        <div>
          <p className="chat_tit">{room.name}</p>
          <p className='chat_desc'>{room.description}</p>
          <input className="chat_creator" type="hidden" value={room.createdBy.name}/>
        </div>
      </div>

    ))

  return (

    <div className="chat openChat">
      {renderChatRooms(chatRooms)}
    </div>
  )
}

export default memo(OpenChat);