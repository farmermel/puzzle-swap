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
                                       puzzles={mockPuzzles}
                                       history={{push: jest.fn()}} />);
  })

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('componentDidMount', () => {
    it.skip('does some stuff', () => {

    })
  })

  describe('retrievePuzzles', () => {
    it.skip('calls watchData on db with whatever is passed', () => {

    })
  })

  describe('parseChats', () => {
    it('returns an existing chat if ownerId and claimerId match an existing chat', () => {

    })

    it('returns undefined if no chat matches ownderId and claimerId', () => {

    })
  })

  describe('checkForExistingChat', () => {
    it.skip('calls getOnce on db with chats as argument', () => {
        
    })

    it.skip('calls parseChats', () => {

    })

    it.skip('returns an existing chat if there is one', () => {

    })

    it.skip('returns null if there is no existing chat', () => {

    })

    it.skip('catches error if something fails', () => {

    })
  })

  describe('goToChat', () => {
    it('calls push on history object with messages/chatId', () => {
      const existingChat = {
        chatId: 5
      };
      expect(wrapper.instance().props.history.push).not.toHaveBeenCalledWith('messages/5');
      wrapper.instance().goToChat(existingChat);
      expect(wrapper.instance().props.history.push).toHaveBeenCalledWith('messages/5');
    })
  })

  describe('makeNewChat', () => {
    it('calls getFirebaseKey method on db with chats as argument', () => {

    })

    it('makes a postDB object with members, a timestamp, a last message, and a chatId', () => {

    })

    it('calls postUpdate on db with an updates object', () => {

    })

    it('calles checkForExistingChat', () => {

    })

    it('catches error if anything fails', () => {

    })
  })

  describe('handleClaim', () => {
    it('calls checkForExistingChat', () => {

    })

    it('calls goToChat with existingChat if there is already a chat', () => {

    })

    it('calls makeNewChat if there is no existing chat', () => {

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
    it.skip('does some stuff', () => {

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