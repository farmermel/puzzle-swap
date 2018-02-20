import React from 'react';
import PropTypes from 'prop-types';
import './Chat.css';

const getMembers = members => {
  return Object.keys(members).map( member => (
    members[member]
  ))
}

const Chat = ({ chat }) => {
  //on claim, start a new chat between current user and puzzle owner
  //gray out claim buttons for puzzles that are current user's
  //chats have {members: uid: 'name', uid: 'name'}, 'last message', 'timestamp', and 'id' that links
  //to messages array located under messages in storage
  return (
    <div className='chat'>
      <h3>Members: <span>{getMembers(chat.members)}</span></h3>
      <h2>{chat.timeStamp}</h2>
      <p>I'm a chat blurb</p>
      <p>hopefully one day you can click on me and I'll also print a bunch of messages</p>
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