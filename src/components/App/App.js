import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { auth, db } from '../../firebase';
import { setUser } from '../../actions/usersActions';
import { setUsersChats } from '../../actions/userChats';
import Main from '../../containers/Main/Main';
import Header from '../../containers/Header/Header';
import PostPuzzleForm from '../PostPuzzleForm/PostPuzzleForm';
import Login from '../../containers/Login/Login';
import SignUp from '../../containers/SignUp/SignUp';
import MessageInbox from '../MessageInbox/MessageInbox';
import Chat from '../../containers/Chat/Chat';
import ChatThread from '../ChatThread/ChatThread';
import PropTypes from 'prop-types';
import './App.css';

export class App extends Component {
  componentDidMount = () => {
    const { setUser } = this.props;
    auth.onAuthStateChanged( authUser => {
      authUser ? this.makeUserObj(authUser) : setUser(null);
    })
  }

  setChats = (chats) => {
    const { user, setUsersChats } = this.props;
    const usersChats = Object.keys(chats).reduce((usersChats, chat) => {
      chats[chat].members[user.uid] && usersChats.push(chats[chat]);
      return usersChats;
    }, [])
    setUsersChats(usersChats);
  }

  getUsersChats = async () => {
    const chatsSnapshot = await db.getOnce('chats');
    const chats = chatsSnapshot.val();
    this.setChats(chats);
  }

  makeUserObj = async authUser => {
    const { setUser } = this.props;
    const userSnap = await db.getOnce(`users/${authUser.uid}`);
    const user = userSnap.val();
    const userObj = { uid: authUser.uid, username: user.username };
    setUser(userObj);
    this.getUsersChats();
  }

  render() {
    const { user, usersChats } = this.props;
    return (
      <div className="App">
        <Header user={ user }/>
        <Switch>
          <Route exact path='/' component={ Main } />
          <Route path='/post-puzzle-form' render={() => (
            <PostPuzzleForm userId={ user.uid } />)} />
          <Route path='/login' render={() => 
            user ? <Redirect to='/' /> : <Login />
          } />
          <Route path='/sign-up' render={() => 
            user ? <Redirect to='/' /> : <SignUp />
          } />
          <Route exact path='/messages' render={() => (
            user ? <MessageInbox /> : <Redirect to='/' />
          )} />

          <Route path='/messages/:id' render={({match}) => {
            const currentChat = usersChats.find( chat => {
              return match.params.id === chat.chatId
            })
            return currentChat 
              ? <ChatThread chat={currentChat}/> 
              : <div className='chat-thread'>loading</div>;
          }} />
        </Switch>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  usersChats: state.usersChats
});

export const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  setUsersChats: usersChats => dispatch(setUsersChats(usersChats))
})

App.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
  setUsersChats: PropTypes.func.isRequired,
  usersChats: PropTypes.arrayOf(PropTypes.shape({
    chatId: PropTypes.string,
    lastMessage: PropTypes.string,
    members: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    timeStamp: PropTypes.string
  }))
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));