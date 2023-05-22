import React, { Component } from 'react';
import OpenChat from './OpenChat';
import DirectChat from './DirectChat';
import { connect } from 'react-redux';
import { getDatabase, ref, push, update, child, onChildAdded, onValue } from 'firebase/database';
import { preventSymbol } from '../../../utils/utils';
import { BsSearch } from 'react-icons/bs'
export class Roomwrap extends Component {
  state = {
    chatRoomsRef: ref(getDatabase(), 'chatRooms'),
    usersRef: ref(getDatabase(), 'users'),
    chatRooms: [],
    users: [],
    searchTerm: "",
    isRender: 0
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
      this.setState({ chatRooms: chatRoomsArray, isRender: this.state.isRender + 1 });
    });
  }

  AddUsersListener = (meId) => {
    onValue(this.state.usersRef, DataSnapshot => {
      let usersArray = [];
      for (const [key, value] of Object.entries(DataSnapshot.val())) {
        if (meId !== key) {
          usersArray.push({...value, uid: key});
          this.setState({ users: usersArray, isRender: this.state.isRender + 1 });
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
    this.renderSearchResult();
  }

  handleSearchTalk = (e) => {
      this.setState({ searchTerm: preventSymbol(e.target.value) }, () => this.renderSearchResult());
  }

  renderSearchResult = () => {
    const roomBox = document.querySelector('.roomBox');
    const regex = new RegExp(this.state.searchTerm, 'gi');
    
    if ( roomBox.classList.contains('direct-view') ) { // 개인톡

      const dmChatLists = this.directChat.querySelectorAll('.dm_chat_item');
      dmChatLists.forEach(el => {
        let name = el.querySelector('.chat_tit').textContent;
        if (name.match(regex)) el.classList.remove('hide');
        else el.classList.add('hide');
      });

    } else { // 공개톡

      const openChatLists = this.openChat.querySelectorAll('.open_chat_item');
      openChatLists.forEach(el => {
          let chatTitle = el.querySelector('.chat_tit').textContent;
          let chatDesc = el.querySelector('.chat_desc').textContent;
          let chatCreator = el.querySelector('.chat_creator').value;
          if ( chatTitle.match(regex) || chatDesc.match(regex) || chatCreator.match(regex) ) {
            el.classList.remove('hide');
          } else {
            el.classList.add('hide');
          }
      });

    }
  }

  render() {
    const { chatRooms, users, isRender, searchTerm } = this.state;
    return (
      <div className='roomWrap'>
      <div className='tab_wrapper'>
        <span className="active" onClick={() => {this.handleTabClick(0)}}>공개톡</span>
        <span onClick={() => {this.handleTabClick(1)}}>개인톡</span>
      </div>
      <div className='search_term_wrap '>
        <span className='ico'><BsSearch/></span>
        <input type="text" className='search_term' onChange={this.handleSearchTalk} value={searchTerm} placeholder='검색'/>
      </div>
      <div className='roomBox'>
        <div ref={(ref) => { this.openChat = ref }}>
          <OpenChat chatRooms={chatRooms} isRender={isRender}/>
        </div>
        <div ref={(ref) => { this.directChat = ref }}>
          <DirectChat users={users} />
        </div>
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