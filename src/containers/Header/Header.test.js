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
    wrapper = shallow(<Header setLogin={jest.fn()} />);
  })

  it('should match snapshot when user is logged in', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should match snapshot when user is not logged in', () => {
    wrapper = shallow(<Header loggedIn={false}
                              setLogin={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  })

  describe('handleSignOut', () => {
    it.skip('calls doSignOut method on auth', () => {
      auth.doSignOut = jest.fn();
      expect(auth.doSignOut).not.toHaveBeenCalled();
      wrapper.instance();
      //why is wrapper.instance null???
      expect(auth.doSignOut).toHaveBeenCalled();
    })
  })
})