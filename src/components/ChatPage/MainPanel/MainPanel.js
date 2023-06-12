import React, { Component } from 'react';
import TalkHeader from './TalkHeader';
import Message from './Message';
import TalkForm from './TalkForm';
import { connect } from 'react-redux';
import { getDatabase, ref, onChildAdded, onChildRemoved, child, off, DataSnapshot } from 'firebase/database';
import { FiAlertTriangle } from 'react-icons/fi';
export class MainPanel extends Component {

  messageEndRef = React.createRef();

  state = {
    searchTerm: "",
    searchResults: [],
    messages: [],
    messagesRef: ref(getDatabase(), 'messages'),
  }

  componentDidMount() {
    const { chatRoom, isPrivateChatRoom } = this.props;

    if (chatRoom) {
     this.addMessagesListeners(chatRoom.id);
    }
  }

  componentDidUpdate() {
    if (this.messageEndRef) {
      const offsetY = this.messageEndRef.getBoundingClientRect().top;
      document.querySelector('.talkBody').scrollBy({
        top: offsetY,
        behavior: 'smooth'
      });
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
        messages: messagesArr,
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

  render() {
    const { searchTerm, messages, searchResults } = this.state;
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
                <div className="boxes" ref={node => (this.messageEndRef = node)} />
            </div>
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
    isPrivateChatRoom: state.chatRoom_reducer.isPrivateChatRoom
  }
}

export default connect(mapStateToProps)(MainPanel);