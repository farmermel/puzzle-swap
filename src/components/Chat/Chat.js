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
    <div className='chat'>
      <Link to={{ pathname: `/messages/${chat.chatId}`}}>
        <p className='chat-member'>{getMembers(chat.members, userId)}</p>
        <div className='last-message'>
          <h2>{chat.puzzleTitle}</h2>
          <p>{chat.lastMessage}</p>
        </div>
        <p className='chat-timestamp'>{chat.timeStamp}</p>
      </Link>
    </div>
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