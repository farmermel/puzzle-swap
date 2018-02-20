import React from 'react';
import { shallow } from 'enzyme';
import { db } from '../../firebase';
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
    it.skip('calls retrivePuzzles', () => {

    })
  })

  describe('parseChats', () => {
    const mockChats = {
      1: {
        members: {
          1: 'Im a member',
          2: 'Im another member'
        }
      }
    }

    it('returns an existing chat if ownerId and claimerId match an existing chat', () => {
      const ownerId = 1;
      const claimerId = 2;
      expect(wrapper.instance().parseChats(mockChats, ownerId, claimerId)).toEqual('1');
    })

    it('returns undefined if no chat matches ownderId and claimerId', () => {
      const ownerId = 0;
      const claimerId = 4;
      expect(wrapper.instance().parseChats(mockChats, ownerId, claimerId)).toEqual(undefined);
    })
  })

  describe('checkForExistingChat', () => {
    // beforeAll(() => {
    //   db.getOnce = jest.fn().mockImplementation(() => {
    //     return { val: () => {return { 1: 'value'}} }
    //     })
    //   });
    //   wrapper.instance().parseChats = jest.fn().mockImplementation(() => {
    //     return 1
    //   })
    // })

    it.skip('calls getOnce on db with chats as argument', () => {
      // expect(wrapper.instance().checkForExistingChat(1, 2)).toEqual()
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

  describe('getUserNames', () => {
    beforeAll(() => {
      db.getOnce = jest.fn().mockImplementation(() => {
        return { val: () => {
          return {
            1: {username: 'mel'},
            2: {username: 'other user'}
          }
        }}
      })
    })

    it('calls getOnce on db with users as argument', async () => {
      expect(db.getOnce).not.toHaveBeenCalled();
      await wrapper.instance().getUserNames('1', '2');
      expect(db.getOnce).toHaveBeenCalledWith('users');
    })

    it('returns an object with ids as keys and names as values', async () => {
      const expected = {"1": "mel", "2": "other user"};
      expect(await wrapper.instance().getUserNames('1', '2')).toEqual(expected);
    })
  })

  describe('makeNewChat', () => {
    // beforeAll(() => {
    //   const mockUsernames = {"1": "mel", "2": "other user"};
    //   db.getFirebaseKey = jest.fn().mockImplementation(() => {
    //     return 2;
    //   })

    //   db.postUpdate = jest.fn();

    //   wrapper.instance().getUserNames = jest.fn().mockImplementation(() => {
    //     return mockUsernames;
    //   })

    //   wrapper.instance().checkForExistingChat = jest.fn().mockImplementation(() => {
    //     return 'done'
    //   });
    // })

    it.skip('calls getFirebaseKey method on db with chats as argument', async () => {
      // expect(db.getFirebaseKey).not.toHaveBeenCalled();
      // await wrapper.instance().makeNewChat('1', '2');
      // expect(db.getFirebaseKey).toHaveBeenCalled();
    })

    it.skip('makes a postDB object with members, a timestamp, a last message, and a chatId', () => {

    })

    it.skip('calls postUpdate on db with an updates object', () => {

    })

    it.skip('calles checkForExistingChat', () => {

    })

    it.skip('catches error if anything fails', () => {

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