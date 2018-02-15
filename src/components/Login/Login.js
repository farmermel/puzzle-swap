import React from 'react';
import '../SignUp/SignUp.css';

const Login = () => {
  return (
    <form className='sign-up'>
      <input type='email' placeholder='email' />
      <input type='password' placeholder='password' />
      <button className='sign-up-btn'>Log in</button>
    </form>
  )
}

export default Login;