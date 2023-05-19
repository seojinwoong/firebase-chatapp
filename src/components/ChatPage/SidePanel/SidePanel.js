import React from 'react';
import MyInfo from './MyInfo';
import FavoriteList from './FavoriteList';

const SidePanel = () => {
  return (
    <div className='sidePanel'>
      <MyInfo />
      <FavoriteList />
    </div>  
  )
}

export default SidePanel
