import React from 'react';
import { shallow } from 'enzyme';
import Messages from './Messages';

describe('Messages', () => {
  it('exists', () => {
    const wrapper = shallow(<Messages />);

    expect(wrapper).toBeDefined()
  })
})