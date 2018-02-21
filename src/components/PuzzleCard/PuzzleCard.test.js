import React from 'react';
import { shallow } from 'enzyme';
import PuzzleCard from './PuzzleCard';
import { mockPuzzles } from '../../mockData';

describe('PuzzleCard', () => {
  const mockPuzzle = mockPuzzles[0];

  it('matches snapshot if user is logged in', () => {
    const wrapper = shallow(<PuzzleCard puzzle={ mockPuzzle }
                                  handleClaim={ jest.fn() }
                                  user={{uid: '5', username: 'Nymeria'}} />);
    expect(wrapper).toMatchSnapshot();
  })

  it('matches snapshot if user is not logged in', () => {
    const wrapper = shallow(<PuzzleCard puzzle={ mockPuzzle }
                                  handleClaim={ jest.fn() }
                                  user={null} />);
    expect(wrapper).toMatchSnapshot();
  })
})