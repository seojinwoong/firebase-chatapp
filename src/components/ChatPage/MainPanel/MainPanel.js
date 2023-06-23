import React, { Component } from 'react';
import TalkHeader from './TalkHeader';
import Message from './Message';
import TalkForm from './TalkForm';
import { connect } from 'react-redux';
import { getDatabase, ref, onChildAdded, onChildRemoved, child, off, DataSnapshot } from 'firebase/database';
import { FiAlertTriangle } from 'react-icons/fi';
export class MainPanel extends Component {

  state = {
    searchTerm: "",
    searchResults: [],
    messages: [],
    messagesRef: ref(getDatabase(), 'messages'),
    typingRef: ref(getDatabase(), 'typing'),
    typingUsers: [],
    listenerLists: []
  }

  componentDidMount() {
    const { chatRoom } = this.props;

    if (chatRoom) {
     this.addMessagesListeners(chatRoom.id);
     this.addTypingListeners(chatRoom.id);
    }
  }

  componentWillUnmount() {
    off(this.state.messagesRef);
  }

  componentDidUpdate() {
    if (document.querySelector('#btmBox')) {
      const offsetY = document.querySelector('#btmBox').getBoundingClientRect().top;
      document.querySelector('.talkBody').scrollBy({
        top: offsetY,
        behavior: 'smooth'
      });
    }
  }

  addTypingListeners = (chatRoomId) => {
    let typingUsers = [];

    let { typingRef } = this.state;

    onChildAdded(child(typingRef, chatRoomId), DataSnapshot => {
      if (DataSnapshot.key !== this.props.me.uid) {
        typingUsers = typingUsers.concat({
          id: DataSnapshot.key,
          name: DataSnapshot.val()
        });
        this.setState({ typingUsers });
      }
    });

    this.addToListenerLists(chatRoomId, this.state.typingRef, 'child_added');
    
    onChildRemoved(child(typingRef, chatRoomId), DataSnapshot => {
      const index = typingUsers.findIndex(user => user.id === DataSnapshot.key);
      if (index !== -1) {
        typingUsers = typingUsers.filter(user => user.id !== DataSnapshot.key);
        this.setState({ typingUsers });
      }
    });

    this.addToListenerLists(chatRoomId, this.state.typingRef, 'child_removed');
  }

  addToListenerLists = (id, ref, event) => {
    const index = this.state.listenerLists.findIndex(listener => {
      return (
        listener.id === id &&
        listener.ref === ref &&
        listener.event === event
      )
    });

    if (index === -1) {
      const newListener = {id, ref, event};
      this.setState({
        listenerLists: this.state.listenerLists.concat(newListener)
      })
    }
  }

  handleSearchMessages = () => {
    const chatRoomMessages = [...this.state.messages];
    const regex = new RegExp(this.state.searchTerm, "gi");
    const searchResults = chatRoomMessages.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.userName.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    this.setState({ searchResults });
  }

  handleChangeSearchTerm = (e) => {
    this.setState({ 
      searchTerm: e.target.value 
    }, () => this.handleSearchMessages());
  }

  addMessagesListeners = (chatRoomId) => {
    let messagesArr = [];
    let { messagesRef } = this.state;

    onChildAdded(child(messagesRef, chatRoomId), DataSnapshot => {
      messagesArr.push(DataSnapshot.val());
      this.setState({
        messages: messagesArr
      });
    })
  }

  renderMessages = (messages) => 
    messages.length > 0 && this.props.me && 
    messages.map((message, i, row) => {
      if (i === row.length - 1 ) {
          return <Message key={message.timestamp} message={message} me={this.props.me} isLastMessage={true} />
        } else {
          return <Message key={message.timestamp} message={message} me={this.props.me} isLastMessage={false} />
      }
    })

    renderTypingUsers = (typingUsers) => 
      typingUsers.length > 0 &&
      typingUsers.map(user => (   
        <div className='typing_loader_wrap'>
            <div className='typing_user'>{user.name.userName.substr(0, 2)}</div>
            <div className='typing_loader'></div>
        </div>
    ))

  render() {
    const { searchTerm, messages, searchResults, typingUsers } = this.state;
    const { chatRoom } = this.props;

    return (
      <div className='mainPanel'>
        {
          chatRoom
          ? 
          <>
            <TalkHeader searchTerm={searchTerm} handleChangeSearchTerm={this.handleChangeSearchTerm} currentChatRoom={chatRoom}/>
            <div className='talkBody'>
                { 
                  searchTerm 
                  ? this.renderMessages(searchResults)
                  : this.renderMessages(messages) 
                }
                <div id="btmBox" />
            </div>
            {this.renderTypingUsers(typingUsers)}
            <TalkForm chatRoom={chatRoom}/>
          </>
          : 
          <div className='no_chat_data'>
              <FiAlertTriangle />
              활성화된 채팅방이 없습니다!
          </div>
        }
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    me: state.user_reducer.currentUser,
    chatRoom: state.chatRoom_reducer.currentChatRoom,
  }
}

export default connect(mapStateToProps)(MainPanel);