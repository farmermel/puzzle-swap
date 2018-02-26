import React from 'react';
import { shallow } from 'enzyme';
import { auth, db } from '../../firebase';
import { SignUp } from './SignUp';

describe('SignUp', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SignUp />)
  })

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('has default state', () => {
    const expected = {"email": "", "error": null, "name": "", "password": ""};
    expect(wrapper.instance().state).toEqual(expected);
  })

  describe('handleChange', () => {
    it('sets state with event passed in', () => {
      const mockEvent = {
        target: {
          name: 'Mel',
          value: 'is great'
        }
      }
      wrapper.instance().handleChange(mockEvent);
      expect(wrapper.instance().state.Mel).toEqual('is great');
    })
  })

  describe('handleSubmit', () => {
    let mockEvent;
    beforeEach(() => {
      auth.doCreateUserWithEmailAndPassword = jest.fn().mockImplementation(() => {
        return { Casey: 'I am Casey',
        uid: 5}
      })
      db.doCreateUser = jest.fn();
      mockEvent = {
        preventDefault: jest.fn()
      }
    })

    it('prevents default', () => {
      wrapper.instance().handleSubmit(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    })

    it('calls auth\'s create user method', () => {
      expect(auth.doCreateUserWithEmailAndPassword).not.toHaveBeenCalled();
      wrapper.instance().handleSubmit(mockEvent);
      expect(auth.doCreateUserWithEmailAndPassword).toHaveBeenCalled();
    })

    it('calls db\'s create user method', async () => {
      expect(db.doCreateUser).not.toHaveBeenCalled();
      await wrapper.instance().handleSubmit(mockEvent);
      expect(db.doCreateUser).toHaveBeenCalled();
    })

    it('sets state with error if something fails', async () => {
      auth.doCreateUserWithEmailAndPassword = jest.fn();
      const expected = 'Cannot read property \'uid\' of undefined'
      await wrapper.instance().handleSubmit(mockEvent);
      expect(wrapper.instance().state.error).toEqual(expected);
    })
  })
})