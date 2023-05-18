import React from 'react';
import defaultProfile from '../../../utils/images/default_profile.png';
import { MdMenu } from 'react-icons/md';

const MyInfo = () => {
  return (
    <div className='myInfo'>
      <img className="my-profile" src={defaultProfile} alt="내 프로필 이미지"/>
      <p className='my-profile-name'>
        <span class="name">Jamie Frabed</span>
        <span class="email">JamieFrabed@naver.com</span>
      </p>
      <MdMenu className='my-info-menu'/>
    </div>
  )
}

export default MyInfo