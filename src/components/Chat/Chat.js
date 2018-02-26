import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Chat.css';

const getMembers = members => {
  return Object.keys(members).map( member => (
    members[member].username
  ))
}

const Chat = ({ chat }) => {
  return (
    <div className='chat'>
      <Link to={{ pathname: `/messages/${chat.chatId}`}}>
        <h3>Members: <span>{getMembers(chat.members)}</span></h3>
        <h2>{chat.timeStamp}</h2>
        <p>{chat.lastMessage}</p>
      </Link>
    </div>
  )
}

Chat.propTypes = {
  chat: PropTypes.shape({
    timeStamp: PropTypes.number,
    members: PropTypes.objectOf(PropTypes.string),
    chatId: PropTypes.string,
    lastMessage: PropTypes.string
  })
}

export default Chat;