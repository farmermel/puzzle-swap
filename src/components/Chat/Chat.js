import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Chat.css';

const getMembers = (members, userId) => {
  const messager = Object.keys(members).find( member => {
    return member !== userId && members[member].username;
  })
  return members[messager].username;
}

const Chat = ({ chat, userId }) => {
  return (
    // <div className='hover-wrap'>
      <div className='chat'>
        <Link to={{ pathname: `/messages/${chat.chatId}`}}>
          <p>{getMembers(chat.members, userId)}</p>
          <p className='last-message'>{chat.lastMessage}</p>
          <p className='chat-timestamp'>{chat.timeStamp}</p>
        </Link>
      </div>
    // </div>
  )
}

Chat.propTypes = {
  chat: PropTypes.shape({
    timeStamp: PropTypes.string,
    members: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    chatId: PropTypes.string,
    lastMessage: PropTypes.string
  })
}

export default Chat;