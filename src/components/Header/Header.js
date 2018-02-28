import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import puzzleIcon from '../../assets/puzzle.svg';
import PropTypes from 'prop-types';
import './Header.css';

export class Header extends Component {
  constructor() {
    super();
    this.state = {
      toggle: '',
      menuOpen: ''
    }
  }

  renderLoggedIn = () => {
    const { user, hasErrored } = this.props;
    return (
      <div>
        <span>{user.username}</span>
        <ul className={`menu ${ this.state.menuOpen }`}
            onClick={ this.toggleToggle }>
          <li><Link to={{ pathname: '/messages' }}><span>Messages</span></Link></li>
          <li><Link to={{ pathname: '/' }} 
                    onClick={() => this.handleSignOut(hasErrored) }><span>Sign Out</span></Link></li>
        </ul>
      </div>
    )
  }

  handleSignOut = async () => {
    const { hasErrored } = this.props;
    try {
      await auth.doSignOut();
    } catch (error) {
      hasErrored(error.message);
    }
  }

  determineLoginButtons = () => {
    const { user, hasErrored } = this.props;
    const display = user ? this.renderLoggedIn(user, hasErrored) : this.renderNotLoggedIn();
      return display;
  }

  renderNotLoggedIn = () => {
    return (
      <ul className={`menu ${ this.state.menuOpen }`}
          onClick={ this.toggleToggle }>
        <li><Link to={{ pathname: '/login' }}><span>Login</span></Link></li>
        <li><Link to={{ pathname: '/sign-up' }}><span>Sign Up</span></Link></li>
      </ul>
    )
  }

  toggleToggle = () => {
    const toggle = this.state.toggle === '' ? 'menu-open' : '';
    const menuOpen = this.state.menuOpen === '' ? 'active' : '';
    this.setState({ toggle, menuOpen });
  }

  render() {
    return (
      <div className="App-header">
        <Link to={{ pathname: '/' }} id='header-wrap'>
          <img src={puzzleIcon} alt='puzzle' className='puzzleicon' />
          <h1 className='app-title'>Puzzle Swap</h1>
        </Link>
        <nav className='header-right'>
          {
            this.props.user && <p className='username-display'>{this.props.user.username}</p>
          }
          <div className={`menu-toggle ${this.state.toggle}`}
               onClick={ this.toggleToggle }><span></span></div>
          { this.determineLoginButtons(this.props.user, this.props.hasErrored) }
        </nav>
      </div>
    )
  }
}

Header.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  hasErrored: PropTypes.func.isRequired
}

export default Header;