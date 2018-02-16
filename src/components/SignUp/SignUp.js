import React, { Component } from 'react';
import { auth, db } from '../../firebase'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLogin } from '../../actions/loginAction';
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
      const { setLogin } = this.props;
      const authUser = await auth.doCreateUserWithEmailAndPassword(email, password);
      await db.doCreateUser(authUser.uid, name, email);
      setLogin(true);
    } catch (e) {
      this.setState({ error: e.message })
      console.log(e)
    }
  }

  render() {
    return (
      <div className='form-wrapper'>
        <form onSubmit={this.handleSubmit}
              className='sign-up'>
          { this.state.error }
          <input type='name' 
                 placeholder='name' 
                 name='name' 
                 onChange={this.handleChange} 
                 value={this.state.name} />
          <input type='email' 
                 placeholder='email' 
                 name='email' 
                 onChange={this.handleChange} 
                 value={this.state.value} />
          <input type='password' 
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

const mapDispatchToProps = (dispatch) => ({
  setLogin: boolean => dispatch(setLogin(boolean))
});

export default connect(null, mapDispatchToProps)(withRouter(SignUp));