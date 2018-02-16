import React from 'react';
import { shallow } from 'enzyme';
import PuzzleContainer from './PuzzleContainer';

describe('PuzzleContainer', () => {
  it('should exist', () => {
    const wrapper = shallow(<PuzzleContainer />);
    expect(wrapper).toBeDefined();
  })
})