import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chat from '../../components/Chat/Chat';
import PropTypes from 'prop-types';
import './MessageInbox.css';

export class MessageInbox extends Component {
  renderChats = () => {
    const { usersChats = [] } = this.props;
    return usersChats.map( chat => (
      <Chat chat={chat}
            key={chat.chatId} />
    ))
  }

  render() {
    return (
      <div className='inbox'>
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
    members: PropTypes.objectOf(PropTypes.string),
    timeStamp: PropTypes.number
  })),
  setUsersChats: PropTypes.func.isRequired
}

export default connect(mapStateToProps, null)(MessageInbox);