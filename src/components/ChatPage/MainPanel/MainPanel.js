import React, { Component } from 'react';
import TalkHeader from './TalkHeader';
import Message from './Message';
import TalkForm from './TalkForm';
import { connect } from 'react-redux';
import { getDatabase, ref, onChildAdded, onChildRemoved, child, off, DataSnapshot } from 'firebase/database';
export class MainPanel extends Component {

  messageEndRef = React.createRef();

  state = {
    searchTerm: "",
    searchResults: [],
    messages: [],
    messagesRef: ref(getDatabase(), 'messages'),
  }

  componentDidMount() {
    const { chatRoom } = this.props;

    if (chatRoom) {
      this.addMessagesListeners(chatRoom.id);
    }
  }

  componentDidUpdate() {
    if (this.messageEndRef) {
      this.messageEndRef.scrollIntoView();
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

  handleChangeSearchTerm = (value) => {
    this.setState({ 
      searchTerm: value 
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
        <TalkHeader searchTerm={searchTerm} handleChangeSearchTerm={this.handleChangeSearchTerm} currentChatRoom={chatRoom}/>

        <div className='talkBody'>
          { 
            searchTerm 
            ? this.renderMessages(searchResults)
            : this.renderMessages(messages) 
          }
          <div ref={node => (this.messageEndRef = node)} />
        </div>

        <TalkForm chatRoom={chatRoom}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    me: state.user_reducer.currentUser,
    chatRoom: state.chatRoom_reducer.currentChatRoom
  }
}

export default connect(mapStateToProps)(MainPanel);