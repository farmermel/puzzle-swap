import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { db } from '../../firebase';
import { hasErrored } from '../../actions/hasErrored';
import PropTypes from 'prop-types';
import moment from 'moment';
import './ChatThread.css';

export class ChatThread extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      messagesToRender: []
    }
  }

  async componentDidMount() {
    const { chat, hasErrored } = this.props;
    try {
      const messagesSnap = await db.watchData(`messages/${chat.chatId}`);
      messagesSnap.on('value', async snapshot => {
        await this.renderMessages(snapshot.val())
      })
    } catch (error) {
      hasErrored(error.message);
    }
  }

  getRecipientName = members => {
    const { user } = this.props;
    const recipientId = Object.keys(members).find( member => {
      return member !== user.uid
    });
    return members[recipientId].username;
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  formatTime = () => {
    return moment().format('h:mma, MMMM Do');
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { user, chat, hasErrored } = this.props;
    try {
      const postDB = {
        username: user.username,
        uid: user.uid,
        message: this.state.message,
        timeStamp: this.formatTime()
      }
      const firebaseKey = db.getFirebaseKey(`messages/${chat.chatId}`);
      let updates = {};
      updates[`messages/${chat.chatId}/${firebaseKey}`] = postDB;
      updates[`chats/${chat.chatId}/lastMessage`] = this.state.message;
      updates[`chats/${chat.chatId}/timeStamp`] = postDB.timeStamp;
      this.setState({ message: '' })
      await db.postUpdate(updates);
    } catch (error) {
      hasErrored(error.message);
    }
  }

  renderMessages = messages => {
    const colorObj = this.determineMessageColor();
    const messagesToRender = messages
      ? Object.keys(messages).map( mkey => {
          return (
            <article className={colorObj[messages[mkey].uid]}
                     key={mkey}>
              <div className='chatthread-details'>
                <p>{messages[mkey].timeStamp}</p>
                <p>{messages[mkey].username}</p>
              </div>
              <p>{messages[mkey].message}</p>
            </article>
          )
        })
      : <h3 className='no-messages'>Introduce yourself!</h3>
    this.setState({ messagesToRender })
  }

  determineMessageColor = () => {
    const { chat, user } = this.props;
    const members = Object.keys(chat.members);
    const recipient = members.find( member => (
      user.uid !== member
    ));
    return {
      [user.uid]: 'speech-right',
      [recipient]: 'speech-left'
    }
  }

  render() {
    this.formatTime();
    const { chat } = this.props;
    return (
      <section className='chat-thread'>
        <h3 className='chat-members'>Your messages with <span>{this.getRecipientName(chat.members)}</span></h3>
        <section className='messages-wrap'>
          {this.state.messagesToRender}
        </section>
        <form onSubmit={ this.handleSubmit }
              className='chat-form'>
          <input type='text'
                 name='message'
                 value={ this.state.message }
                 onChange={ this.handleChange } />
          <button type='submit'
                  value='Send'
                  className='submit-chat'>Send</button>
        </form>
      </section>
    ) 
  }
}

export const mapStateToProps = state => ({
  user: state.user
})

export const mapDispatchToProps = dispatch => ({
  hasErrored: message => dispatch(hasErrored(message))
})

ChatThread.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.number,
    username: PropTypes.string
  }),
  chat: PropTypes.shape({
    members: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    chatId: PropTypes.string
  }),
  hasErrored: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, null)(ChatThread));