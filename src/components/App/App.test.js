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
                           user={{ uid: '4'}}
                           setUsersChats={jest.fn()}
                           hasErrored={jest.fn()} />, 
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

    it('catches error and calls hasErrored error message if anything errors', async () => {
      auth.onAuthStateChanged = jest.fn().mockImplementation(() => {
        throw new Error('failed to check auth state')
      }); 
      await wrapper.instance().componentDidMount();
      expect(wrapper.instance().props.hasErrored).toHaveBeenCalledWith('failed to check auth state');
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
      wrapper.instance().getUsersChats = jest.fn()
      expect(db.getOnce).not.toHaveBeenCalled();
      wrapper.instance().makeUserObj(mockAuthUser);
      expect(db.getOnce).toHaveBeenCalled();
    })

    it('calls setUser with a user object with a userid and username', async () => {
      wrapper.instance().getUsersChats = jest.fn()
      const expected = {"uid": "5", "username": "Nymeria"};
      expect(wrapper.instance().props.setUser).not.toHaveBeenCalled();
      await wrapper.instance().makeUserObj(mockAuthUser);
      expect(wrapper.instance().props.setUser).toHaveBeenCalledWith(expected);
    })

    it('catches error and calls hasErrored error message if anything errors', async () => {
      db.getOnce = jest.fn().mockImplementation(() => {
        throw new Error('failed to reach database')
      }); 
      await wrapper.instance().makeUserObj(wrapper.instance().props.user);
      expect(wrapper.instance().props.hasErrored).toHaveBeenCalledWith('failed to reach database');
    })
  })

  describe('setChats', () => {
    let mockChats;
    beforeAll(() => {
      mockChats = {
        1: {
          members: {
            3: 'person3',
            4: 'person4'
          }
        },
        2: {
          members: {
            5: 'person5',
            6: 'person6'
          }
        }
      }
    })

    it('cleans chats passed in to only chats with current user in store in them and calls setUsersChats with cleaned data', () => {
      const expected = [{"members": {"3": "person3", "4": "person4"}}];
      expect(wrapper.instance().props.setUsersChats).not.toHaveBeenCalled();
      wrapper.instance().setChats(mockChats);
      expect(wrapper.instance().props.setUsersChats).toHaveBeenCalledWith(expected);
    })
  })

  describe('getUsersChats', () => {
    beforeAll(() => {
      db.getOnce = jest.fn().mockImplementation(() => {
        return { val: () => 'chat' }
      })
    })

    it('calls getOnce method on db with chats as argument', () => {
      wrapper.instance().setChats = jest.fn();
      expect(db.getOnce).not.toHaveBeenCalled();
      wrapper.instance().getUsersChats();
      expect(db.getOnce).toHaveBeenCalledWith('chats');
    })

    it('calls setChats with chats as an argument', async () => {
      wrapper.instance().setChats = jest.fn();
      expect(wrapper.instance().setChats).not.toHaveBeenCalled();
      await wrapper.instance().getUsersChats();
      expect(wrapper.instance().setChats).toHaveBeenCalledWith('chat');
    })

    it('catches error and calls hasErrored error message if anything errors', async () => {
      db.getOnce = jest.fn().mockImplementation(() => {
        throw new Error('failed to reach database')
      }); 
      await wrapper.instance().getUsersChats();
      expect(wrapper.instance().props.hasErrored).toHaveBeenCalledWith('failed to reach database');
    })
  })

  describe('mapStateToProps', () => {
    it('maps state to props', () => {
      const mockStore = {
        user: { uid: 7},
        usersChats: [{ chatId: '5'}],
        errorMessage: 'failed'
      }
      const mapped = mapStateToProps(mockStore);
      expect(mapped.user).toEqual(mockStore.user);
      expect(mapped.usersChats).toEqual(mockStore.usersChats);
      expect(mapped.errorMessage).toEqual(mockStore.errorMessage);
    })
  })

  describe('mapDispatchToProps', () => {
    it('maps dispatch to props', () => {
      const mockDispatch = jest.fn();
      const mapped = mapDispatchToProps(mockDispatch);
      expect(mockDispatch).not.toHaveBeenCalled();
      mapped.setUser();
      mapped.hasErrored();
      mapped.setUsersChats();
      expect(mockDispatch).toHaveBeenCalledTimes(3);
    })
  })
});