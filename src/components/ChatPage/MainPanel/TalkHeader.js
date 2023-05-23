import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import defaultProfile from '../../../utils/images/default_profile.png';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs';

const TalkHeader = ({searchTerm, handleChangeSearchTerm, currentChatRoom}) => {
  const [isSearchTermView, setIsSearchTermView] = useState(false);

  const handleChange = (e) => {
    handleChangeSearchTerm(e.target.value);
  }
  const handleToggleSearchBar = () => {
    setIsSearchTermView(prev => !prev);
    if (isSearchTermView) handleChangeSearchTerm(""); 
  }

  return (
    <div className='talkHeader'>  
      <div className="talkHeaderInner">
        <div className='left_section'>
          <OverlayTrigger 
            placement="bottom" 
            overlay={
              <Tooltip>
                {currentChatRoom && currentChatRoom.createdBy.name}님이 개설한 공개톡방입니다.
              </Tooltip>
            }
          >
            <img className="profile-thumb" src={currentChatRoom && currentChatRoom.createdBy.image || defaultProfile} alt="프로필이미지" />
          </OverlayTrigger>
          <div>
            <p className='current_talk_name'>{currentChatRoom && currentChatRoom.name}</p>
            <p className='current_talk_desc'>{currentChatRoom && currentChatRoom.description}</p>
          </div>
        </div>
        <div className='right_section'>
          <span className='badge like'><AiOutlineHeart /></span>
          <span className='badge' onClick={handleToggleSearchBar}><BsSearch /></span>
        </div>
      </div>
      {
        isSearchTermView 
        && <div className='search_term_wrap'>
            <span className='ico'><BsSearch/></span>
            <input type="text" className='search_term' value={searchTerm} onChange={handleChange}/>
          </div>
      }
    </div>
  )
}

export default TalkHeader