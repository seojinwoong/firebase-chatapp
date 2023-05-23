import React from 'react';
import defaultProfile from '../../../utils/images/default_profile.png';
import landScape from '../../../utils/images/landscape.png';

const Message = () => {
  return (
    <>
      {/* 상대방 message 시작점 */}
      {/* 연달아서 쓴 경우에만 나오는 프로필 start */}
      <div className="chat_user">
        <img src={defaultProfile} alt="프로필 사진" className='profile-thumb chat_thumb'/>
        <p className="chat_user_name">홍길동</p>
      </div>
      {/* 연달아서 쓴 경우에만 나오는 프로필 end */}

      <div className='message_item_wrap'>
          <div className="message_item">
            <p className='text'>
              테스트
            </p>
            <p className='time'>오후 2:51</p>
          </div>
          <div className="message_item">
            <img src={landScape} alt="업로드 이미지" />
            <p className='time'>오후 2:51</p>
          </div>
      </div>
      {/* 상대방 message 끝점 */}

      <div className='message_item_wrap my_chat'>
          <div className="message_item">
            <p className='text'>
            테스트
            </p>
            <p className='time'>오후 2:51</p>
          </div>
          <div className="message_item">
            <p className='text'>
            테스트
            </p>
            <p className='time'>오후 2:51</p>
          </div>
          <div className="message_item">
            <img src={landScape} alt="업로드 이미지" />
            <p className='time'>오후 2:51</p>
          </div>
      </div>

    </>
    

  )
}

export default Message