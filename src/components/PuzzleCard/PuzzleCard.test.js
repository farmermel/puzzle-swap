import React from 'react';
import { shallow } from 'enzyme';
import PuzzleCard from './PuzzleCard';

describe('PuzzleCard', () => {
  it('should exist', () => {
    const wrapper = shallow(<PuzzleCard />);
    expect(wrapper).toBeDefined();
  })
})