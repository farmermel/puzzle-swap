import React, { Component } from 'react';
import { auth, db } from '../../firebase'
import { withRouter } from 'react-router-dom';
import './SignUp';

export class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
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
    e.preventDefault()
    try {
      const { name, email, password } = this.state;
      const authUser = await auth.doCreateUserWithEmailAndPassword(email, password);
      await db.doCreateUser(authUser.uid, name, email);
    } catch (error) {
      this.setState({ error: error.message })
      console.log(error)
    }
  }

  render() {
    return (
      <div className='form-wrapper'>
        <form onSubmit={this.handleSubmit}
              className='sign-up'>
          <h3>Sign Up</h3>
          { this.state.error }
          <label htmlFor='signup-name'>Name</label>
          <input type='name' 
                 id='signup-name'
                 placeholder='name' 
                 name='name' 
                 onChange={this.handleChange} 
                 value={this.state.name} />
          <label htmlFor='signup-email'>Email</label>
          <input type='email' 
                 id='signup-email'
                 placeholder='email' 
                 name='email' 
                 onChange={this.handleChange} 
                 value={this.state.value} />
          <label htmlFor='signup-password'>Password</label>
          <input type='password' 
                 id='signup-password'
                 placeholder='password'
                 name='password'
                 onChange={this.handleChange}
                 value={this.state.password} />
          <button className='sign-up-btn'>Sign up</button>
        </form>
      </div>
    )
  }
}

export default withRouter(SignUp);