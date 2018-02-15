import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="App-header">
      <Link to={{ pathname: '/' }}>
        <h1 className='app-title'>Puzzle Swap</h1>
      </Link>
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
    </div>
  )
}

export default Header;