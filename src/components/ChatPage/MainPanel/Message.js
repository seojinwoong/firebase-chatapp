import React from 'react';
import defaultProfile from '../../../utils/images/default_profile.png';

const Message = ({message, me, isLastMessage}) => {
  const isImage = (message) => {
    return message.hasOwnProperty('image') && !message.hasOwnProperty('content');
  }
  const isMineMessage = (messageId, currentUserId) => messageId === currentUserId ? "my_chat" : "";
  
  return (
    <>
        {
          message.userId !== me.uid && message.isProfileView
          ? <div className="chat_user">
              <img src={message ? message.userPhoto : defaultProfile} alt="프로필 사진" className='profile-thumb chat_thumb'/>
              <p className="chat_user_name">{message && message.userName}</p>
            </div>
          : null
        }
        <div 
        data-messageid={message.userId}
        className={`
            message_item_wrap ${isMineMessage(message.userId, me.uid)}
            ${isLastMessage ? 'last_message' : ''}
        `}>
          <div className="message_item">
              {
                isImage(message)
                ? <img src={message.image} alt="업로드 이미지"/>
                : <p className='text'>{message.content}</p>
              }
            <p className='time'>오후 2:51</p>
          </div>
        </div>
    </>
  )
}

export default Message