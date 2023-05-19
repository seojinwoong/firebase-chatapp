import React from 'react';
import defaultProfile from '../../../utils/images/default_profile.png';
import {GrGroup} from 'react-icons/gr';
import {BsFillChatSquareTextFill} from 'react-icons/bs';
import {TbHeartOff} from 'react-icons/tb';


const FavoriteList = () => {
  return (
    <div className='favoriteList mt-5'>
      <p className='sect_tit'>즐겨찾기</p>
      
      <div className="scroll-x">
        <ul className='scroll-x-inner favorite_room_wrapper'>
          <li className='favorite_room'>
            <img className="favorite_profile" src={defaultProfile} alt="유저 썸네일 이미지"/>
            <p className='favorite_name'>Jospasdkjhasd watererses</p>
            <p className='last_chat_time'>24 mins ago</p>
            <div className='btn_wrap clearfix'>
              <span className='badge opentalk'><GrGroup /></span>
              <TbHeartOff className="off_like"/>
            </div>
          </li>
          <li className='favorite_room'>
            <img className="favorite_profile" src={defaultProfile} alt="유저 썸네일 이미지"/>
            <p className='favorite_name'>Jospasdkjhasd watererses</p>
            <p className='last_chat_time'>24 mins ago</p>
            <div className='btn_wrap clearfix'>
              <span className='badge direct'><BsFillChatSquareTextFill /></span>
              <TbHeartOff className="off_like"/>
            </div>
          </li>
          <li className='favorite_room'>
            <img className="favorite_profile" src={defaultProfile} alt="유저 썸네일 이미지"/>
            <p className='favorite_name'>Jospasdkjhasd watererses</p>
            <p className='last_chat_time'>24 mins ago</p>
            <div className='btn_wrap clearfix'>
              <span className='badge opentalk'><GrGroup /></span>
              <TbHeartOff className="off_like"/>
            </div>
          </li>
          <li className='favorite_room'>
            <img className="favorite_profile" src={defaultProfile} alt="유저 썸네일 이미지"/>
            <p className='favorite_name'>Jospasdkjhasd watererses</p>
            <p className='last_chat_time'>24 mins ago</p>
            <div className='btn_wrap clearfix'>
              <span className='badge direct'><BsFillChatSquareTextFill /></span>
              <TbHeartOff className="off_like"/>
            </div>
          </li>
        </ul>
      </div>

    </div>
  )
}

export default FavoriteList