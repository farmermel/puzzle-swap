import React from 'react';

const Chat = ({ chat }) => {
  //on claim, start a new chat between current user and puzzle owner
  //gray out claim buttons for puzzles that are current user's
  //chats have {members: uid: 'name', uid: 'name'}, 'last message', 'timestamp', and 'id' that links
  //to messages array located under messages in storage
    console.log(chat)
  return (
    <div>
      <h2>{chat.timeStamp}</h2>
      <p>I'm a chat blurb</p>
      <p>hopefully one day I'll also print a bunch of messages conditionally</p>
    </div>
  )
}

export default Chat;