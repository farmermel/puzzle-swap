import React from 'react';
import { shallow } from 'enzyme';
import { MessageInbox, mapStateToProps, mapDispatchToProps } from './MessageInbox';

describe('MessageInbox', () => {
  it('exists', () => {
    const wrapper = shallow(<MessageInbox setUsersChats={jest.fn()} />);

    expect(wrapper).toBeDefined()
  })
})