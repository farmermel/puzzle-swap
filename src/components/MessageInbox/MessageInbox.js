import React, { Component } from 'react';
import { db } from '../../firebase';
import { connect } from 'react-redux';
import { setUsersChats } from '../../actions/userChats';
import Chat from '../../containers/Chat/Chat';
import './MessageInbox.css';

export class MessageInbox extends Component {
  async componentDidMount() {
    const chatsSnapshot = await db.getOnce('chats');
    const chats = chatsSnapshot.val();
    this.setChats(chats);
  }

  setChats = (chats) => {
    const { userId, setUsersChats } = this.props;
    const usersChats = Object.keys(chats).reduce((usersChats, chat) => {
      chats[chat].members[userId] && usersChats.push(chats[chat])
      return usersChats;
    }, [])
    setUsersChats(usersChats);
  }

  renderChats = () => {
    const { usersChats = [] } = this.props;
    return usersChats.map( chat => (
      <Chat chat={chat}
            key={chat.chatId} />
    ))
  }

  //click of chat goes to associated chat
  render() {
    return (
      <div className='inbox'>
        {this.renderChats()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.uid,
  usersChats: state.usersChats
})

const mapDispatchToProps = dispatch => ({
  setUsersChats: usersChats => dispatch(setUsersChats(usersChats))
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageInbox);