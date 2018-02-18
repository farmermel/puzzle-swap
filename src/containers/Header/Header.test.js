import React from 'react';
import { shallow } from 'enzyme';
import { Header,
determineLoginButtons,
renderLoggedIn,
handleSignOut,
renderNotLoggedIn,
mapDispatchToProps } from './Header';

describe('Header', () => {
  it('should match snapshot when user is logged in', () => {
    let wrapper = shallow(<Header loggedIn={true}
                                  setLogin={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  })

  it('should match snapshot when user is not logged in', () => {
    let wrapper = shallow(<Header loggedIn={false}
                                  setLogin={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  })

  it.skip('should have more tests', () => {

  })

  //write tests for helper functions
})