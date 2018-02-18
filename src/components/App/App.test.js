import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { auth } from '../../firebase';
import { App,
mapStateToProps,
mapDispatchToProps } from './App';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App setUser={jest.fn()}
                           user={null} />, 
                      {disableLifecycleMethods: true});
  })

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('componentDidMount', () => {
    it.skip('calls onAuthStateChanged method from auth and sets user if user exists', () => {
      // const mockUser = { uid: 7};
      // auth.onAuthStateChanged = jest.fn().mockImplementation((mockUser) => {
      //   mockUser ? setUser(mockUser) : setUser(null)
      // })
      // wrapper.instance().props.user = mockUser;
      // wrapper.instance().componentDidMount();
      // expect(wrapper.instance().props.setUser).toHaveBeenCalled();
    })

    it.skip('calls onAuthStateChanged method from auth and sets user as null if user doesn\'t exist', () => {

    })
  })

  describe('mapStateToProps', () => {
    it('maps state to props', () => {
      const mockStore = {
        user: { uid: 7}
      }
      const mapped = mapStateToProps(mockStore);
      expect(mapped.user).toEqual(mockStore.user);
    })
  })

  describe('mapDispatchToProps', () => {
    it('maps dispatch to props', () => {
      const mockDispatch = jest.fn();
      const mapped = mapDispatchToProps(mockDispatch);
      expect(mockDispatch).not.toHaveBeenCalled();
      mapped.setUser();
      expect(mockDispatch).toHaveBeenCalled();
    })
  })
});