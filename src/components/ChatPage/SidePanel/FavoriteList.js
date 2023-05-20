import React from 'react';
import defaultProfile from '../../../utils/images/default_profile.png';
import {HiUserGroup} from 'react-icons/hi';
import {BsFillChatSquareTextFill} from 'react-icons/bs';
import {TbHeartOff} from 'react-icons/tb';


const FavoriteList = () => {
  return (
    <div className='favoriteList mt-5'>
      <p className='sect_tit'>즐겨찾기</p>
      <ul className='scroll-x favorite_room_wrapper'> 

        <li className='scroll-x-item favorite_room'>
          <img className="favorite_profile" src={defaultProfile} alt="유저 썸네일 이미지"/>
          <div className='favorite_box'>
            <p className='favorite_name ellipsis_2'>Jospasdkjhasd watererses1</p>
            <p className='last_chat_time'>24 mins ago</p>
            <div className='btn_wrap'>
              <span className='badge opentalk'><HiUserGroup /></span>
              <span className='badge off_like'><TbHeartOff /></span>
            </div>
          </div>
        </li>
        <li className='scroll-x-item favorite_room'>
          <img className="favorite_profile" src={defaultProfile} alt="유저 썸네일 이미지"/>
          <div className='favorite_box'>
            <p className='favorite_name ellipsis_2'>Jospasdkjhasd watererses2</p>
            <p className='last_chat_time'>24 mins ago</p>
            <div className='btn_wrap'>
              <span className='badge direct'><BsFillChatSquareTextFill /></span>
              <span className='badge off_like'><TbHeartOff /></span>
            </div>
          </div>
        </li>

        <li className='scroll-x-item favorite_room'>
          <img className="favorite_profile" src={defaultProfile} alt="유저 썸네일 이미지"/>
          <div className='favorite_box'>
            <p className='favorite_name ellipsis_2'>Jospasdkjhasd watererses3</p>
            <p className='last_chat_time'>24 mins ago</p>
            <div className='btn_wrap'>
              <span className='badge opentalk'><HiUserGroup /></span>
              <span className='badge off_like'><TbHeartOff /></span>
            </div>
          </div>
        </li>

        <li className='scroll-x-item favorite_room'>
          <img className="favorite_profile" src={defaultProfile} alt="유저 썸네일 이미지"/>
          <div className='favorite_box'>
            <p className='favorite_name ellipsis_2'>Jospasdkjhasd watererses4</p>
            <p className='last_chat_time'>24 mins ago</p>
            <div className='btn_wrap'>
              <span className='badge direct'><BsFillChatSquareTextFill /></span>
              <span className='badge off_like'><TbHeartOff /></span>
            </div>
          </div>
        </li>
        
        <li className='scroll-x-item favorite_room'>
          <img className="favorite_profile" src={defaultProfile} alt="유저 썸네일 이미지"/>
          <div className='favorite_box'>
            <p className='favorite_name ellipsis_2'>Jospasdkjhasd watererses4</p>
            <p className='last_chat_time'>24 mins ago</p>
            <div className='btn_wrap'>
              <span className='badge direct'><BsFillChatSquareTextFill /></span>
              <span className='badge off_like'><TbHeartOff /></span>
            </div>
          </div>
        </li>

      </ul>

    </div>
  )
}

export default FavoriteList