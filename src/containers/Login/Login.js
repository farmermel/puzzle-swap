import React, { Component } from 'react';
import { auth } from '../../firebase';
import '../SignUp/SignUp.css';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: null
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = this.state;
      await auth.doSignInWithEmailAndPassword(email, password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div className='form-wrapper'>
        <form onSubmit={ this.handleSubmit }
              className='sign-up'>
          <h3>Log in</h3>
          <p>{ this.state.error }</p>
          <label htmlFor='login-email'>Email</label>
          <input type='email' 
                 id='login-email'
                 placeholder='email' 
                 name='email' 
                 value={ this.state.email } 
                 onChange={ this.handleChange } />
          <label htmlFor='login-password'>Password</label>
          <input type='password' 
                 id='login-password'
                 placeholder='password' 
                 name='password' 
                 value={ this.password } 
                 onChange={ this.handleChange } />
          <button className='sign-up-btn'>Log in</button>
        </form>
      </div>
    )
  }
}

export default Login;