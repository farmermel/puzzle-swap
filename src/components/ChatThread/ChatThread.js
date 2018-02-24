import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db } from '../../firebase';
import PropTypes from 'prop-types';
import './ChatThread.css';

export class ChatThread extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      messagesToRender: [],
      error: null
    }
  }

  async componentDidMount() {
    const { chat } = this.props;
    const messagesSnap = await db.watchData(`messages/${chat.chatId}`);
    messagesSnap.on('value', snapshot => {
      this.renderMessages(snapshot.val())
    })
  }

  getMembers = members => {
    const membersArr = Object.keys(members).map( member => (
      members[member]
    ))
    return membersArr.join(', ');
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, chat } = this.props;
      const postDB = {
        username: user.username,
        uid: user.uid,
        message: this.state.message,
        timeStamp: Date().toString()
      }
      const firebaseKey = db.getFirebaseKey(`messages/${chat.chatId}`);
      let updates = {};
      updates[`messages/${chat.chatId}/${firebaseKey}`] = postDB;
      updates[`chats/${chat.chatId}/lastMessage`] = this.state.message;
      updates[`chats/${chat.chatId}/timeStamp`] = postDB.timeStamp;
      this.setState({ message: '' })
      await db.postUpdate(updates);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  renderMessages = messages => {
    const colorObj = this.determineMessageColor();
    const messagesToRender = messages
      ? Object.keys(messages).map( mkey => {
          return (
            <article className={colorObj[messages[mkey].uid]}
                     key={mkey}>
              <div>
                <p>{messages[mkey].timeStamp}</p>
                <h3>{messages[mkey].username}</h3>
              </div>
              <p>{messages[mkey].message}</p>
            </article>
          )
        })
      : <h3>Introduce yourself!</h3>
    this.setState({ messagesToRender })
  }

  determineMessageColor = () => {
    const { chat } = this.props;
    const members = Object.keys(chat.members);
    return {
      [members[0]]: 'speech-right',
      [members[1]]: 'speech-left'
    }
  }

  render() {
    const { chat } = this.props;
    return (
      <section className='chat-thread'>
        <h3 className='chat-members'>Members: <span>{this.getMembers(chat.members)}</span></h3>
        <section className='messages-wrap'>
          {this.state.messagesToRender}
        </section>
        <form onSubmit={ this.handleSubmit }
              className='chat-form'>
          <input type='text'
                 name='message'
                 value={ this.state.message }
                 onChange={ this.handleChange } />
          <button className='submit-chat'>Send</button>
        </form>
      </section>
    ) 
  }
}

export const mapStateToProps = state => ({
  user: state.user
})

ChatThread.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.number,
    username: PropTypes.string
  }),
  chat: PropTypes.shape({
    members: PropTypes.objectOf(PropTypes.string),
    chatId: PropTypes.string
  })
}

export default connect(mapStateToProps, null)(ChatThread);