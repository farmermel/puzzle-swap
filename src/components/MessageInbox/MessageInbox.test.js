import React from 'react';
import { shallow } from 'enzyme';
import MessageInbox from './MessageInbox';

describe('MessageInbox', () => {
  it('exists', () => {
    const wrapper = shallow(<MessageInbox />);

    expect(wrapper).toBeDefined()
  })
})