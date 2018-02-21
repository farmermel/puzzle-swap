import React from 'react';
import { shallow } from 'enzyme';
import { auth } from '../../firebase';
import { Header,
determineLoginButtons,
renderLoggedIn,
handleSignOut,
renderNotLoggedIn } from './Header';

describe('Header', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Header user={{username: 'case', uid: '5'}} />);
  })

  it('should match snapshot when user is logged in', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should match snapshot when user is not logged in', () => {
    wrapper = shallow(<Header user={null} />);
    expect(wrapper).toMatchSnapshot();
  })

  describe('handleSignOut', () => {
    it('calls doSignOut method on auth', () => {
      auth.doSignOut = jest.fn();
      expect(auth.doSignOut).not.toHaveBeenCalled();
      handleSignOut();
      expect(auth.doSignOut).toHaveBeenCalled();
    })
  })
})