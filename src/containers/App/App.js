import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { auth, db } from '../../firebase';
import { setUser, setUsersChats, hasErrored } from '../../actions';
import Main from '../Main/Main';
import Header from '../../components/Header/Header';
import PostPuzzleForm from '../../components/PostPuzzleForm/PostPuzzleForm';
import Login from '../../components/Login/Login';
import SignUp from '../../components/SignUp/SignUp';
import MessageInbox from '../MessageInbox/MessageInbox';
import ChatThread from '../ChatThread/ChatThread';
import PropTypes from 'prop-types';
import loadingGif from '../../assets/puzzle.gif';
import './App.css';

export class App extends Component {
  componentDidMount = () => {
    const { setUser, hasErrored } = this.props;
    try {
      auth.onAuthStateChanged( authUser => {
        authUser ? this.makeUserObj(authUser) : setUser(null);
      }) 
    } catch (error) {
      hasErrored(error.message);
    }
  }

  makeUserObj = async authUser => {
    const { setUser, hasErrored } = this.props;
    try {
      const userSnap = await db.getOnce(`users/${authUser.uid}`);
      const user = userSnap.val();
      const userObj = { uid: authUser.uid, username: user.username };
      setUser(userObj);
      this.getUsersChats();
    } catch (error) {
      hasErrored(error.message);
    }
  }

  getUsersChats = async () => {
    const { hasErrored } = this.props;
    try {
      const chatsSnapshot = await db.getOnce('chats');
      const chats = chatsSnapshot.val();
      this.setChats(chats);
    } catch (error) {
      hasErrored(error.message);
    }
  }

  setChats = (chats) => {
    const { user, setUsersChats } = this.props;
    const usersChats = Object.keys(chats).reduce((usersChats, chat) => {
      chats[chat].members[user.uid] && usersChats.push(chats[chat]);
      return usersChats;
    }, [])
    setUsersChats(usersChats);
  }

  render() {
    const { user, usersChats, errorMessage, hasErrored, location } = this.props;
    return (
      <div className="App">
        <Header user={ user } hasErrored={ hasErrored }/>
        {
          errorMessage && <h2>Oops, something went wrong!</h2>
        }
        <Switch>
          <Route exact path='/' component={ Main } />
          <Route path='/post-puzzle-form' render={() => (
            user ? <PostPuzzleForm userId={ user.uid } 
                                   hasErrored={ hasErrored }
                                   userLocation={ location } /> : <Redirect to='/' /> )} />
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
              ? <ChatThread chat={ currentChat }/> 
              : (<div className='chat-thread'><img src={ loadingGif } alt='loading' className='loading-gif' /></div>);
          }} />
        </Switch>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user,
  usersChats: state.usersChats,
  errorMessage: state.errorMessage,
  location: state.location
});

export const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  setUsersChats: usersChats => dispatch(setUsersChats(usersChats)),
  hasErrored: message => dispatch(hasErrored(message))
})

App.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
  setUsersChats: PropTypes.func.isRequired,
  hasErrored: PropTypes.func.isRequired,
  location: PropTypes.string,
  usersChats: PropTypes.arrayOf(PropTypes.shape({
    chatId: PropTypes.string,
    lastMessage: PropTypes.string,
    members: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    timeStamp: PropTypes.string
  })),
  errorMessage: PropTypes.string
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));