import React from 'react';
import { shallow } from 'enzyme';
import PuzzleCard from './PuzzleCard';
import { mockPuzzles } from '../../mockData';

describe('PuzzleCard', () => {
  const mockPuzzle = mockPuzzles[0]
  it('should exist', () => {
    const wrapper = shallow(<PuzzleCard puzzle={ mockPuzzle } />);
    expect(wrapper).toBeDefined();
  })
})