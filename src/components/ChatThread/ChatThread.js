import React, { Component } from 'react';
import './ChatThread.css';



//right now this is rendering the same data as a chat
//should eventually render message threads

class ChatThread extends Component {
  constructor() {
    super();
    this.state = {
      message: ''
    }
  }

  getMembers = members => {
    return Object.keys(members).map( member => (
      members[member]
    ))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { chat } = this.props;
    return (
      <section className='chat-thread'>
        I'm a chat thread!
        <h3>Members: <span>{this.getMembers(chat.members)}</span></h3>
        <form className='chat-form'>
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

export default ChatThread;