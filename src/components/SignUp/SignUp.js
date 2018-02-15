import React from 'react';
import './SignUp';

const SignUp = () => {
  return (
    <form className='sign-up'>
      <input type='text' placeholder='name' />
      <input type='email' placeholder='email' />
      <input type='password' placeholder='password' />
      <button className='sign-up-btn'>Sign up</button>
    </form>
  )
}

export default SignUp;