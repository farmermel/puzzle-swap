import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../firebase';
import { setLogin } from '../../actions/loginAction';
import puzzleIcon from '../../assets/puzzle.svg';
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

export const handleSignOut = async () => {
  await auth.doSignOut();
}

export const renderLoggedIn = () => {
  return (
    <div className='header-right'>
      <a onClick={handleSignOut}>Sign out</a>
      <Link to={{ pathname: '/messages' }}>
        <button className='messages'>Messages</button>
      </Link>
    </div>
  )
}

export const determineLoginButtons = (user) => {
  const display = user ? renderLoggedIn() : renderNotLoggedIn();
  return display;
}

export const Header = ({ user }) => {
  return (
    <div className="App-header">
      <Link to={{ pathname: '/' }} id='header-wrap'>
        <img src={puzzleIcon} alt='puzzle' className='puzzleicon' />
        <h1 className='app-title'>Puzzle Swap</h1>
      </Link>
          { determineLoginButtons(user) }
    </div>
  )
}

export const mapDispatchToProps = dispatch => ({
  setLogin: boolean => dispatch(setLogin(boolean))
})

export default connect(null, mapDispatchToProps)(Header);