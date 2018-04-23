import React from 'react';
import { shallow } from 'enzyme';
import { auth } from '../../firebase';
import { Header } from './Header';

describe('Header', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Header user={{username: 'case', uid: '5'}}
                              hasErrored={jest.fn()} />);
  })

  it('should match snapshot when user is logged in', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should match snapshot when user is not logged in', () => {
    wrapper = shallow(<Header user={null}
                              hasErrored={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  })

  describe('handleSignOut', () => {
    it('calls doSignOut method on auth', () => {
      auth.doSignOut = jest.fn();
      expect(auth.doSignOut).not.toHaveBeenCalled();
      wrapper.instance().handleSignOut();
      expect(auth.doSignOut).toHaveBeenCalled();
    })

    it('catches error and calls hasErrored error message if anything errors', async () => {
      auth.doSignOut = jest.fn().mockImplementation(() => {
        throw new Error('failed to sign out')
      }); 
      await wrapper.instance().handleSignOut();
      expect(wrapper.instance().props.hasErrored).toHaveBeenCalledWith('failed to sign out');
    })
  })
})