import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { auth } from '../../firebase';
import { setUser } from '../../actions/usersActions';
import Main from '../../containers/Main/Main';
import Header from '../../containers/Header/Header';
import PostPuzzleForm from '../PostPuzzleForm/PostPuzzleForm';
import Login from '../../containers/Login/Login';
import SignUp from '../../containers/SignUp/SignUp';
import MessageInbox from '../MessageInbox/MessageInbox';
import Chat from '../../containers/Chat/Chat';
import PropTypes from 'prop-types';
import './App.css';

export class App extends Component {
  componentDidMount = () => {
    const { setUser } = this.props;
    auth.onAuthStateChanged(authUser => {
      authUser ? setUser(authUser) : setUser(null);
    })
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
          <Route path='/messages' render={() => (
            user ? <MessageInbox /> : <Redirect to='/' />
          )} />
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
  setUser: user => dispatch(setUser(user))
})

App.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired
}

// <Route path='/messages/:id' render={() => {
  // const currentChat = usersChats.find( chat => {
    // console.log(this.props.match)
    // return this.props.match.params.id === chat.chatId
  // })
  // console.log(currentChat)
  // return <Chat />
  // find current chat id in users chats, pass that in to chat to be rendered
// }} />

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
