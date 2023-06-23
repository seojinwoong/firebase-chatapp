import React, { useState, useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import defaultProfile from '../../../utils/images/default_profile.png';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import {HiUserGroup} from 'react-icons/hi';
import { BsSearch, BsFillChatSquareTextFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { onValue, child, getDatabase, ref, remove, update, onChildRemoved, DataSnapshot } from 'firebase/database';

const TalkHeader = ({searchTerm, handleChangeSearchTerm, currentChatRoom}) => {
  const chatRoom = useSelector(state => state.chatRoom_reducer.currentChatRoom);
  const isPrivateChatRoom = useSelector(state => state.chatRoom_reducer.isPrivateChatRoom);
  const renderCounts = useSelector(state => state.user_reducer.renderCounts);
  const me = useSelector(state => state.user_reducer.currentUser);
  const usersRef = ref(getDatabase(), 'users');
  const [isSearchTermView, setIsSearchTermView] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (chatRoom && me) {
      addFavoriteListener(chatRoom.id, me.uid);
    }
  }, []);

  const addFavoriteListener = (chatRoomId, userId) => {
    onValue(child(usersRef, `${userId}/favorited`), data => {
      if (data.val() !== null) {
        const chatRoomIds = Object.keys(data.val());
        const isAlreadyFavorited = chatRoomIds.includes(chatRoomId);
        setIsFavorite(isAlreadyFavorited);
      }
    });

    onChildRemoved(child(usersRef, `${userId}/favorited`), DataSnapshot => {
      setIsFavorite(false);
    });
  }

  const handleFavorite = () => {
    if (isFavorite) {
      setIsFavorite(prev => !prev);
      remove(child(usersRef, `${me.uid}/favorited/${chatRoom.id}`));
    } else {
      setIsFavorite(prev => !prev);
      update(child(usersRef, `${me.uid}/favorited`), {
        [chatRoom.id]: {
          name: chatRoom.name,
          description: chatRoom.description,
          creatorName: chatRoom.createdBy.name,
          creatorImage: chatRoom.createdBy?.image || ""
        }
      })
    }
  }

  const handleToggleSearchBar = () => {
    setIsSearchTermView(prev => !prev);
  }

  return (
    <div className='talkHeader'>  
      <div className="talkHeaderInner">
        <div className='left_section'>
          {
            isPrivateChatRoom 
            ? <img className="profile-thumb" 
              src={currentChatRoom?.image ? `${currentChatRoom.image}?v=${(renderCounts)}` : defaultProfile}
              alt="프로필이미지" />
            : <OverlayTrigger 
                  placement="bottom" 
                  overlay={
                    <Tooltip>
                      {currentChatRoom && currentChatRoom.createdBy.name}님이 개설한 공개톡방입니다.
                    </Tooltip>
                  }
                >
                  <img className="profile-thumb" 
                  src={currentChatRoom?.createdBy?.image ? `${currentChatRoom.createdBy.image}?v=${(renderCounts)}` : defaultProfile}
                  alt="프로필이미지" />
                </OverlayTrigger>
          }
          <div>
            <p className='current_talk_name'>{currentChatRoom && currentChatRoom.name}</p>
            {!isPrivateChatRoom && <p className='current_talk_desc'>{currentChatRoom && currentChatRoom.description}</p>}
          </div>
        </div>
        <div className='right_section'>
          {
            isPrivateChatRoom
            ? <div className='mini-badge-wrap'><span className='mini-badge direct'><BsFillChatSquareTextFill /></span> <span className='txt'>개인톡</span></div>
            : <div className='mini-badge-wrap'><span className='mini-badge opentalk'><HiUserGroup /></span> <span className='txt'>공개톡</span></div>
          }
          <div>
            {
              !isPrivateChatRoom &&
              <span className='badge like' onClick={handleFavorite}>
                {
                  isFavorite
                  ? <AiFillHeart />
                  : <AiOutlineHeart />
                }
              </span>
            }
            <span className='badge' onClick={handleToggleSearchBar}><BsSearch /></span>
          </div>
        </div>
      </div>
      {
        isSearchTermView 
        && <div className='search_term_wrap'>
            <span className='ico'><BsSearch/></span>
            <input type="text" className='search_term' value={searchTerm} onChange={handleChangeSearchTerm} placeholder='메세지 OR 작성자 검색'/>
          </div>
      }
    </div>
  )
}

export default TalkHeader