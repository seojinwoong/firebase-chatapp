import React from 'react';
import { getAuth, signOut } from 'firebase/auth';

const MainPanel = () => {
  return (
    <div className='mainPanel'>
      <button onClick={() => {
         const auth = getAuth();
         signOut(auth);
      }}>로그아웃</button>
    </div>
  )
}

export default MainPanel