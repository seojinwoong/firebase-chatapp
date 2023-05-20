import React from 'react';
import MyInfo from './MyInfo';
import FavoriteList from './FavoriteList';
import RoomWrap from './RoomWrap';

const SidePanel = () => {
  return (
    <div className='sidePanel'>
      <MyInfo />
      <FavoriteList />
      <RoomWrap />
    </div>  
  )
}

export default SidePanel
