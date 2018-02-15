import React, { Component } from 'react';
import '../SignUp/SignUp.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <form action='https://formspree.io/melenasuliteanu@gmail.com'
            className='sign-up'
            method='post'>
        <input type='email' placeholder='email' name='email' value={ this.state.email } onChange={ (e) => this.handleChange(e) } />
        <input type='password' placeholder='password' name='password' value={ this.password } onChange={ (e) => this.handleChange(e) } />
        <button className='sign-up-btn'>Log in</button>
      </form>
    )
  }
}

export default Login;