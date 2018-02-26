import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import puzzleIcon from '../../assets/puzzle.svg';
import PropTypes from 'prop-types';
import './Header.css';

export const renderNotLoggedIn = () => {
  return (
    <div className='header-right'>
      <div className='login-container'>
        <Link to={{ pathname: '/login' }}>
          <span className='login'>Login</span>
        </Link>
        <Link to={{ pathname: '/sign-up' }}>
          <span>Sign up</span>
        </Link>   
      </div>
      
    </div>
  )
}

export const handleSignOut = async hasErrored => {
  try {
    await auth.doSignOut();
  } catch (error) {
    hasErrored(error.message);
  }

}

export const renderLoggedIn = (user, hasErrored) => {
  return (
    <div className='header-right'>
      <div className='user-wrap'>
        <p>{user.username}</p>
        <a onClick={() => handleSignOut(hasErrored) }>Sign out</a>
      </div>
      <Link to={{ pathname: '/messages' }}>
        <button className='messages'>Messages</button>
      </Link>
    </div>
  )
}

export const determineLoginButtons = (user, hasErrored) => {
  const display = user ? renderLoggedIn(user, hasErrored) : renderNotLoggedIn();
  return display;
}

export const Header = ({ user, hasErrored }) => {
  return (
    <div className="App-header">
      <Link to={{ pathname: '/' }} id='header-wrap'>
        <img src={puzzleIcon} alt='puzzle' className='puzzleicon' />
        <h1 className='app-title'>Puzzle Swap</h1>
      </Link>
          { determineLoginButtons(user, hasErrored) }
    </div>
  )
}

Header.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  hasErrored: PropTypes.func.isRequired
}

export default Header;