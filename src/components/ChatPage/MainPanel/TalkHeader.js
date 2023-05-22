import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import defaultProfile from '../../../utils/images/default_profile.png';
import { FaUserAlt } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'

const TalkHeader = () => {
  return (
    <div className='talkHeader'>  
      <div className="talkHeaderInner">
        <div className='left_section'>
          <OverlayTrigger 
            placement="bottom" 
            overlay={
              <Tooltip>
                홍길동님이 개설한 공개톡방입니다.
              </Tooltip>
            }
          >
            <img className="profile-thumb" src={defaultProfile} alt="프로필이미지" />
          </OverlayTrigger>
          <div>
            <p className='current_talk_name'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur, explicabo voluptatem veniam aliquam alias ad quo atque voluptates ullam culpa at pariatur incidunt harum quos. Ea eum cum nulla veritatis!</p>
            <p className='current_talk_desc'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur, explicabo voluptatem veniam aliquam alias ad quo atque voluptates ullam culpa at pariatur incidunt harum quos. Ea eum cum nulla veritatis!</p>
          </div>
        </div>
        <div className='right_section'>
          <span className='participate'>
            <FaUserAlt /> 5
          </span>
          <span className='badge'><AiOutlineHeart /></span>
          <span className='badge'><BsSearch /></span>
        </div>
      </div>
      <div className='search_term_wrap'>
        <span className='ico'><BsSearch/></span>
        <input type="text" className='search_term' />
      </div>
    </div>
  )
}

export default TalkHeader