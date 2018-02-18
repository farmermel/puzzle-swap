import React from 'react';
import { shallow } from 'enzyme';
import { PuzzleContainer,
mapStateToProps,
mapDispatchToProps } from './PuzzleContainer';
import { mockPuzzles } from '../../mockData';

describe('PuzzleContainer', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PuzzleContainer setPuzzles={jest.fn()}
                                       puzzles={mockPuzzles} />);
  })

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('componentDidMount', () => {
    it.skip('does some stuff', () => {

    })
  })

  describe('retrievePuzzles', () => {
    it('calls watchData on db with whatever is passed', () => {

    })
  })

  describe('parsePuzzles', () => {
    it.skip('does some stuff', () => {

    })
  })

  describe('displayPuzzles', () => {
    it.skip('does some stuff', () => {

    })
  })

  describe('getImg', () => {
    it('does some stuff', () => {

    })
  })

  describe('mapStateToProps', () => {
    it('maps state to props', () => {
      const mockStore = {
        puzzles: 'are great'
      }
      const mapped = mapStateToProps(mockStore);
      expect(mapped.puzzles).toEqual(mockStore.puzzles);
    })
  })

  describe('mapDispatchToProps', () => {
    it('maps dispatch to props', () => {
      const mockDispatch = jest.fn();
      const mapped = mapDispatchToProps(mockDispatch);
      expect(mockDispatch).not.toHaveBeenCalled();
      mapped.setPuzzles();
      expect(mockDispatch).toHaveBeenCalled();
    })
  })
})