import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../firebase';
import { setLogin } from '../../actions/loginAction';
import './Header.css';

const renderNotLoggedIn = () => {
  return (
    <div className='header-right'>
      <div className='login-container'>
        <Link to={{ pathname: '/login' }}>
          <button className='login'>Login</button>
        </Link>
        <Link to={{ pathname: '/sign-up' }}>
          <button className='login'>Sign up</button>
        </Link>   
      </div>
      <Link to={{ pathname: '/messages' }}>
        <button className='messages'>Messages</button>
      </Link>
    </div>
  )
}

const handleSignOut = async () => {
  await auth.doSignOut();
  setLogin(false);
}

const renderLoggedIn = () => {
  return <button onClick={handleSignOut}>Sign out</button>
}

const determineLoginButtons = (loggedIn) => {
  const display = loggedIn ? renderLoggedIn() : renderNotLoggedIn();
  return display;
}

const Header = ({ loggedIn }) => {
  return (
    <div className="App-header">
      <Link to={{ pathname: '/' }}>
        <h1 className='app-title'>Puzzle Swap</h1>
      </Link>
          { determineLoginButtons(loggedIn) }
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setLogin: boolean => dispatch(setLogin(boolean))
})

export default connect(null, mapDispatchToProps)(Header);