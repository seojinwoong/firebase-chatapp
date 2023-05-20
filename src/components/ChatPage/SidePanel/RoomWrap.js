import React, { Component } from 'react';
import OpenChat from './OpenChat';
import DirectChat from './DirectChat';
import { connect } from 'react-redux';
import { getDatabase, ref, push, update, child, onChildAdded, onValue } from 'firebase/database';

export class Roomwrap extends Component {
  state = {
    chatRoomsRef: ref(getDatabase(), 'chatRooms'),
    usersRef: ref(getDatabase(), 'users'),
    chatRooms: [],
    users: [],
  } 

  componentDidMount() {
    this.AddChatRoomsListener();

    if (this.props.me) {
      this.AddUsersListener(this.props.me.uid);
    }
  }

  AddChatRoomsListener = () => {
    let chatRoomsArray = [];
    onChildAdded(this.state.chatRoomsRef, DataSnapshot => {
      chatRoomsArray.push(DataSnapshot.val());
      this.setState({ chatRooms: chatRoomsArray });
    });
  }

  AddUsersListener = (meId) => {
    onValue(this.state.usersRef, DataSnapshot => {
      let usersArray = [];
      for (const [key, value] of Object.entries(DataSnapshot.val())) {
        if (meId !== key) {
          usersArray.push({...value, uid: key});
          this.setState({ users: usersArray });
        }
      } 
    });
  }

  handleTabClick = (num) => {
    const tab = document.querySelectorAll('.tab_wrapper span');
    const roomBox = document.querySelector('.roomBox');
    tab.forEach((item) => item.classList.remove('active'));
    tab[num].classList.add('active');

    if (num === 1) {
      roomBox.classList.add('direct-view')
    } else {
      roomBox.classList.remove('direct-view')
    }
  }

  render() {
    const { chatRooms, users } = this.state;
    return (
      <div className='roomWrap'>
      <div className='tab_wrapper'>
        <span className="active" onClick={() => {this.handleTabClick(0)}}>공개톡</span>
        <span onClick={() => {this.handleTabClick(1)}}>개인톡</span>
      </div>
      <input type="text" className='search_form' placeholder='🔍︎ 검색'/>

      <div className='roomBox'>
        <OpenChat chatRooms={chatRooms}/>
        <DirectChat users={users}/>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    me: state.user_reducer.currentUser,
  }
} 

export default connect(mapStateToProps)(Roomwrap);