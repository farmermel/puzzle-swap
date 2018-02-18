import React from 'react';
import { shallow } from 'enzyme';
import { auth } from '../../firebase';
import { Login } from './Login';

describe('Login', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login setLogin={jest.fn()} />);
  })

  it('matches snapshot', () => {
    expect(wrapper).toBeDefined();
  })

  it('has default state', () => {
    const expected = {
      email: '',
      password: '',
      error: null
    }
    expect(wrapper.instance().state).toEqual(expected);
  })

  describe('handleChange', () => {
    it('sets state with event passed in', () => {
      const mockEvent = {
        target: {
          name: 'email',
          value: 'wren@goog.com'
        }
      }
      wrapper.instance().handleChange(mockEvent);
      expect(wrapper.instance().state.email).toEqual('wren@goog.com');
    })
  })

  describe('handleSubmit', () => {
    const mockEvent = {
      preventDefault: jest.fn()
    }
    auth.doSignInWithEmailAndPassword = jest.fn().mockImplementation(() => {
      return { uid: 4 }
    })
    it('prevents event default', () => {
      wrapper.instance().handleSubmit(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    })

    it('calls auth\'s sign in method', () => {

    })

    it('calls setLogin with argument true', () => {

    })

    it('sets state with an error message if signin fails', () => {

    })
  })
})