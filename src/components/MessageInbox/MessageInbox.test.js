import React from 'react';
import { shallow } from 'enzyme';
import { db } from '../../firebase';
import { MessageInbox, mapStateToProps, mapDispatchToProps } from './MessageInbox';

describe('MessageInbox', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MessageInbox setUsersChats={jest.fn()}
                                    userId='4' />, 
                {disableLifecycleMethods: true});
  })

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('componentDidMount', () => {
    beforeAll(() => {
      db.getOnce = jest.fn().mockImplementation(() => {
        return { val: () => 'chat' }
      })
    })

    it('calls getOnce method on db with chats as argument', () => {
      wrapper.instance().setChats = jest.fn();
      expect(db.getOnce).not.toHaveBeenCalled();
      wrapper.instance().componentDidMount();
      expect(db.getOnce).toHaveBeenCalledWith('chats');
    })

    it('calls setChats with chats as an argument', async () => {
      wrapper.instance().setChats = jest.fn();
      expect(wrapper.instance().setChats).not.toHaveBeenCalled();
      await wrapper.instance().componentDidMount();
      expect(wrapper.instance().setChats).toHaveBeenCalledWith('chat');
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

  describe('mapStateToProps', () => {
    it('maps state to props', () => {
      const mockStore = {
        user: { uid: '4' },
        usersChats: [{chat: 'chat chat'}]
      }
      const mapped = mapStateToProps(mockStore);
      expect(mockStore.user.uid).toEqual(mapped.userId);
      expect(mockStore.usersChats).toEqual(mapped.usersChats);
    })
  })

  describe('mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    mapped.setUsersChats();
    expect(mockDispatch).toHaveBeenCalled();
  })
})