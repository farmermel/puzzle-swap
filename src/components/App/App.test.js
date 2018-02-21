import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { auth, db } from '../../firebase';
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
    it('calls onAuthStateChanged method from auth', () => {
      const mockUser = { uid: 7};
      auth.onAuthStateChanged = jest.fn();
      wrapper.instance().componentDidMount();
      expect(auth.onAuthStateChanged).toHaveBeenCalled();
    })
  })

  describe('makeUserObj', () => {
    let mockAuthUser;
    beforeAll(() => {
      db.getOnce = jest.fn().mockImplementation(() => {
        return { val: () => {
          return { username: 'Nymeria' }
        }}
      })

      mockAuthUser = { uid: '5' }
    })

    it('calls getOnce method on db with a path of users and id passed in', () => {
      expect(db.getOnce).not.toHaveBeenCalled();
      wrapper.instance().makeUserObj(mockAuthUser);
      expect(db.getOnce).toHaveBeenCalled();
    })

    it('calls setUser with a user object with a userid and username', async () => {
      const expected = {"uid": "5", "username": "Nymeria"};
      expect(wrapper.instance().props.setUser).not.toHaveBeenCalled();
      await wrapper.instance().makeUserObj(mockAuthUser);
      expect(wrapper.instance().props.setUser).toHaveBeenCalledWith(expected);
    })
  })

  describe('mapStateToProps', () => {
    it('maps state to props', () => {
      const mockStore = {
        user: { uid: 7},
        usersChats: [{ chatId: '5'}]
      }
      const mapped = mapStateToProps(mockStore);
      expect(mapped.user).toEqual(mockStore.user);
      expect(mapped.usersChats).toEqual(mockStore.usersChats);
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