import React, { Component } from 'react';
import { auth } from '../../firebase';
import { setLogin } from '../../actions/loginAction';
import { connect } from 'react-redux';
import '../SignUp/SignUp.css';

class Login extends Component {
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
      const { setLogin } = this.props;
      const authUser = await auth.doSignInWithEmailAndPassword(email, password);
      // await this.setState({
      //   email: '',
      //   password: '',
      //   error: null
      // });
      setLogin(true);
    } catch (e) {
      this.setState({ error: e.message })
      console.log(e)
    }
  }

  render() {
    return (
      <div className='form-wrapper'>
        <form onSubmit={ this.handleSubmit }
              className='sign-up'>
          <p>{ this.state.error }</p>
          <input type='email' placeholder='email' name='email' value={ this.state.email } onChange={ this.handleChange } />
          <input type='password' placeholder='password' name='password' value={ this.password } onChange={ this.handleChange } />
          <button className='sign-up-btn'>Log in</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setLogin: boolean => dispatch(setLogin(boolean))
})

export default connect(null, mapDispatchToProps)(Login);