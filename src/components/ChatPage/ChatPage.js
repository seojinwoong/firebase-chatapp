import React from 'react';
import { getAuth, signOut } from 'firebase/auth';

const ChatPage = () => {

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth);
  }

  return (
    <div>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  )
}

export default ChatPage