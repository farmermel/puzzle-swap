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
})