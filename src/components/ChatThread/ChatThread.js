import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db } from '../../firebase';
import './ChatThread.css';

class ChatThread extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      messagesToRender: []
    }
  }

  async componentDidMount() {
    const { chat } = this.props;
    const messagesSnap = await db.watchData(`messages/${chat.chatId}`)
    messagesSnap.on('value', snapshot => {
      this.renderMessages(snapshot.val())
    })
  }

  getMembers = members => {
    const membersArr = Object.keys(members).map( member => (
      members[member]
    ))
    return membersArr.join(', ')
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
      const date = Date()
      const postDB = {
        username: user.username,
        uid: user.uid,
        message: this.state.message,
        timeStamp: date.toString()
      }
      const firebaseKey = db.getFirebaseKey(`messages/${chat.chatId}`);
      let updates = {};
      updates[`messages/${chat.chatId}/${firebaseKey}`] = postDB;
      updates[`chats/${chat.chatId}/lastMessage`] = this.state.message;
      updates[`chats/${chat.chatId}/timeStamp`] = postDB.timeStamp;
      this.setState({ message: '' })
      await db.postUpdate(updates);
    } catch (error) {
      console.log(error)
    }
  }

  // getMessages = async () => {
  //   // const { chat } = this.props;
  //   // const messagesSnap = await db.watchData(`messages/${chat.chatId}`)
  //   // messagesSnap.on('value', snapshot => {
  //   //   this.renderMessages(snapshot.val())
  //   // })
  // }

  renderMessages = messages => {
    const messagesToRender = messages
      ? Object.keys(messages).map( mkey => {
          return (
            <article>
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

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, null)(ChatThread);