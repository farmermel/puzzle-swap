import React from 'react';
import { shallow } from 'enzyme';
import Chat from './Chat';

describe('Chat', () => {
  it('matches snapshot', () => {
    const mockChat = {
      members: {
        3: {name: 'person1'},
        4: {name: 'person2'}
      },
      timeStamp: '34'
    }
    const wrapper = shallow(<Chat chat={mockChat}/>);
    expect(wrapper).toMatchSnapshot();
  })
})