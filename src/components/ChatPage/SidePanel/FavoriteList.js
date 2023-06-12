import React, { Component } from 'react';
import defaultProfile from '../../../utils/images/default_profile.png';
import {HiUserGroup} from 'react-icons/hi';
import {TbHeartOff} from 'react-icons/tb';
import { connect } from 'react-redux';
import { remove, child, getDatabase, ref, onChildAdded, onChildRemoved, off } from 'firebase/database';
import { setCurrentChatRoom, setPrivateChatRoom } from '../../../redux/actions/chatRoom_action';
import { doRender } from '../../../redux/actions/user_action';

export class FavoriteList extends Component {
  state = {
    favoritedChatRooms: [],
    activeChatRoomId: "",
    userRef: ref(getDatabase(), 'users'),
    firstLoad: true
  }

  componentDidMount() {
    if (this.props.user) {
      this.addListener(this.props.user.uid);
    }
  }
  
  componentWillUnmount() {
    if (this.props.user) {
      this.removeListener(this.props.user.uid);
    }
  }

  addListener = (userId) => {
    const { userRef } = this.state;
    let favoriteArr = [];

    onChildAdded(child(userRef, `${userId}/favorited`), DataSnapshot => {
      if (this.state.firstLoad) {
        favoriteArr.push({ id: DataSnapshot.key, ...DataSnapshot.val() });
        this.setState({
          favoritedChatRooms: favoriteArr,
          firstLoad: false
        });
      } else {
        this.setState({
          favoritedChatRooms: [...this.state.favoritedChatRooms, { id: DataSnapshot.key, ...DataSnapshot.val() }]
        })
      }
    });

    onChildRemoved(child(userRef, `${userId}/favorited`), DataSnapshot => {
      const filteredChatRooms = this.state.favoritedChatRooms.filter(chatRoom => {
        return chatRoom.id !== DataSnapshot.key
      });
      this.setState({ favoritedChatRooms: filteredChatRooms });
    });
  }

  removeListener = (userId) => {
    const { userRef } = this.state;
    off(child(userRef, `${userId}/favorited`));
  }
  
  handleOffFavorite = (chatRoomId) => {
    const { userRef } = this.state;
    const { user } = this.props;
    
    remove(child(userRef, `${user.uid}/favorited/${chatRoomId}`));
    this.props.dispatch(doRender());
  }

  render() {
    const { favoritedChatRooms } = this.state;
    const { renderCounts } = this.props;
    return (
      <div className='favoriteList'>
      <p className='sect_tit'>즐겨찾기</p>
      <ul className='scroll-x favorite_room_wrapper'> 
        {
          favoritedChatRooms.length > 0 
          && favoritedChatRooms.reverse().map(chatRoom => (
            <li className='scroll-x-item favorite_room'>
              <img className="favorite_profile profile-thumb" 
                src={chatRoom.creatorImage === "" ? defaultProfile : `${chatRoom.creatorImage}?v=${(renderCounts)}`}
                alt="프로필이미지" />
              <div className='favorite_box'>
                <p className='favorite_name ellipsis_2'>{chatRoom.name}</p>
                <p className='last_chat_time'>방 개설자 : {chatRoom.creatorName}</p>
                <div className='btn_wrap'>
                  <span className='badge opentalk'><HiUserGroup /></span>
                  <span className='badge off_like' onClick={() => this.handleOffFavorite(chatRoom.id)}><TbHeartOff /></span>
                </div>
              </div>
              {console.log('asdasdsa', JSON.stringify(chatRoom, null, 2))}
            </li>
          ))
        }
      </ul>
      {
        favoritedChatRooms.length === 0 && <div className='no_favorited_chat'>즐겨찾기한 톡방이 없습니다!</div>
      }
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user_reducer.currentUser,
    renderCounts: state.user_reducer.renderCounts
  }
}

export default connect(mapStateToProps)(FavoriteList)



