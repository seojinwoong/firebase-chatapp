import React, { Component } from 'react';
import TalkHeader from './TalkHeader';
import TalkBody from './TalkBody';
import TalkForm from './TalkForm';
import { connect } from 'react-redux';
export class MainPanel extends Component {
  state = {
    searchTerm: ""
  }

  handleChangeSearchTerm = (value) => {
    this.setState({ searchTerm: value });
  }

  render() {
    const { searchTerm } = this.state;
    const { chatRoom } = this.props;

    return (
      <div className='mainPanel'>
        <TalkHeader searchTerm={searchTerm} handleChangeSearchTerm={this.handleChangeSearchTerm} currentChatRoom={chatRoom}/>
        <TalkBody />
        <TalkForm chatRoom={chatRoom}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chatRoom: state.chatRoom_reducer.currentChatRoom
  }
}

export default connect(mapStateToProps)(MainPanel);