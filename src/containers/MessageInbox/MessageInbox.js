import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chat from '../../components/Chat/Chat';
import PropTypes from 'prop-types';
import './MessageInbox.css';

export class MessageInbox extends Component {
  renderChats = () => {
    const { usersChats = [], userId } = this.props;
    return usersChats.map( chat => (
      <Chat chat={chat}
            userId={userId}
            key={chat.chatId} />
    ))
  }

  render() {
    return (
      <div className='inbox'>
        <h1 className='content-header'>Your Messages</h1>
        {this.renderChats()}
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  userId: state.user.uid,
  usersChats: state.usersChats
})

MessageInbox.propTypes = {
  userId: PropTypes.string,
  usersChats: PropTypes.arrayOf(PropTypes.shape({
    chatId: PropTypes.string,
    lastMessage: PropTypes.string,
    members: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    timeStamp: PropTypes.string
  }))
}

export default connect(mapStateToProps, null)(MessageInbox);