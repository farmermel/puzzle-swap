import React from 'react';
import { shallow } from 'enzyme';
import { db, storage } from '../../firebase';
import { PuzzleContainer,
mapStateToProps,
mapDispatchToProps } from './PuzzleContainer';
import { mockPuzzles } from '../../mockData';

describe('PuzzleContainer', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PuzzleContainer setPuzzles={jest.fn()}
                                       puzzles={mockPuzzles}
                                       history={{push: jest.fn()}}
                                       user={{uid: '5', username: 'Casey'}} />);
  })

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('componentDidMount', () => {
    it('calls retrivePuzzles', () => {
      wrapper.instance().retrievePuzzles = jest.fn().mockImplementation(() => {
        return { on: jest.fn() }
      })
      expect(wrapper.instance().retrievePuzzles).not.toHaveBeenCalled();
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().retrievePuzzles).toHaveBeenCalled();
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
    beforeAll(() => {
      db.getOnce = jest.fn().mockImplementation(() => {
        return { 
          val: () => {
            return { 1: 'value'}
          } 
        }
      })
    });

    beforeEach(() => {
      wrapper.instance().parseChats = jest.fn().mockImplementation(() => {
        return '1'
      })
    })

    it('calls getOnce on db with chats as argument', async () => {
      expect(db.getOnce).not.toHaveBeenCalled();
      wrapper.instance().checkForExistingChat(1, 2);
      expect(db.getOnce).toHaveBeenCalled();
    })

    it('calls parseChats', async () => {
      expect(wrapper.instance().parseChats).not.toHaveBeenCalled();
      await wrapper.instance().checkForExistingChat(1, 2);
      expect(wrapper.instance().parseChats).toHaveBeenCalled();
    })

    it('returns an existing chat if there is one', async () => {
      const expected = 'value';
      expect(await wrapper.instance().checkForExistingChat(1, 2)).toEqual(expected);
    })

    it('returns null if there is no existing chat', async () => {
      wrapper.instance().parseChats = jest.fn().mockImplementation(() => {
        return false
      })
      expect(await wrapper.instance().checkForExistingChat(1, 2)).toEqual(null);
    })

    it('catches error if something fails', () => {

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
    let mockUsernames;
    beforeAll(() => {
      mockUsernames = {"1": "mel", "2": "other user"};
      db.getFirebaseKey = jest.fn().mockImplementation(() => {
        return 2;
      })

      db.postUpdate = jest.fn();
    })

    beforeEach(() => {
      wrapper.instance().getUserNames = jest.fn().mockImplementation(() => {
      return mockUsernames;
      })
      wrapper.instance().checkForExistingChat = jest.fn().mockImplementation(() => {
        return 'done'
      });
    })

    it('calls getFirebaseKey method on db with chats as argument', async () => {
      expect(db.getFirebaseKey).not.toHaveBeenCalled();
      await wrapper.instance().makeNewChat('1', '2');
      expect(db.getFirebaseKey).toHaveBeenCalled();
    })

    it.skip('calls postUpdate on db with an updates object', async () => {
      // global.Date = jest.fn().mockImplementation(() => {
      //   return {
      //     now: jest.fn().mockImplementation(() => {
      //       return 5
      //     })
      //   }
      // })
      const expected = {
        "chats/2": {
          "chatId": 2, 
          "lastMessage": "", 
          "members": {
            "1": "mel", 
            "2": "other user"
          }, 
          "timeStamp": Date.now()
        }
      }
      wrapper.instance().makeNewChat('1', '2');
      expect(db.postUpdate).toHaveBeenCalledWith(expected);
    })

    it('calls checkForExistingChat', async () => {
      expect(wrapper.instance().checkForExistingChat).not.toHaveBeenCalled();
      await wrapper.instance().makeNewChat('1', '2');
      expect(wrapper.instance().checkForExistingChat).toHaveBeenCalled();
    })

    it('catches error if anything fails', () => {
      db.getFirebaseKey = jest.fn().mockImplementation(() => {
        throw new Error('failed')
      })

      wrapper.instance().makeNewChat('1', '2');
      expect(wrapper.instance().state.error).toEqual('failed');
    })
  })

  describe('handleClaim', () => {
    beforeAll(() => {
      wrapper.instance().checkForExistingChat = jest.fn().mockImplementation(() => {
        return {}
      })
      wrapper.instance().goToChat = jest.fn();
      wrapper.instance().makeNewChat = jest.fn();
    })

    it('calls checkForExistingChat', () => {
      wrapper.instance().checkForExistingChat = jest.fn().mockImplementation(() => {
        return {}
      })
      expect(wrapper.instance().checkForExistingChat).not.toHaveBeenCalled();
      wrapper.instance().handleClaim('3', '4');
      expect(wrapper.instance().checkForExistingChat).toHaveBeenCalled();
    })

    it('calls goToChat with existingChat if there is already a chat', async () => {
      wrapper.instance().checkForExistingChat = jest.fn().mockImplementation(() => {
        return {chat: 'chat chat'}
      })
      wrapper.instance().goToChat = jest.fn();
      expect(wrapper.instance().goToChat).not.toHaveBeenCalled();
      await wrapper.instance().handleClaim('3', '4');
      expect(wrapper.instance().goToChat).toHaveBeenCalled();
    })

    it('calls makeNewChat if there is no existing chat', async () => {
      wrapper.instance().checkForExistingChat = jest.fn().mockImplementation(() => {
        return false
      })
      wrapper.instance().makeNewChat = jest.fn();
      expect(wrapper.instance().makeNewChat).not.toHaveBeenCalled();
      await wrapper.instance().handleClaim('3', '4');
      expect(wrapper.instance().makeNewChat).toHaveBeenCalled();
    })
  })

  describe('parsePuzzles', () => {
    let mockSnapshot;
    beforeEach(() => {
      wrapper.instance().getImg = jest.fn().mockImplementation(() => {
        return 'url'
      })
    })

    beforeAll(() => {
      mockSnapshot = {
        1: {
          puzzleId: '1'
        },
        2: {
          puzzleId: '2'
        },
        3: {
          puzzleId: '3'
        }
      }
    })

    it('calls getImg for every puzzle in storage', () => {
      expect(wrapper.instance().getImg).not.toHaveBeenCalled();
      wrapper.instance().parsePuzzles(mockSnapshot);
      expect(wrapper.instance().getImg).toHaveBeenCalledTimes(3);
    })

    it('calls setPuzzles with an array of puzzles', async () => {
      const expected = [{"imgUrl": "url", "puzzleId": "1"}, {"imgUrl": "url", "puzzleId": "2"}, {"imgUrl": "url", "puzzleId": "3"}];
      expect(wrapper.instance().props.setPuzzles).not.toHaveBeenCalled();
      await wrapper.instance().parsePuzzles(mockSnapshot);
      expect(wrapper.instance().props.setPuzzles).toHaveBeenCalledWith(expected);
    })
  })

  describe('getImg', () => {
    beforeAll(() => {
      storage.getStoreRef = jest.fn().mockImplementation(() => {
        return { getDownloadURL: jest.fn().mockImplementation(() => {
          return 'niceurl'
        }) }
      })
    })

    it('calls getStoreRef method on storage with url containing id passed in', () => {
      expect(storage.getStoreRef).not.toHaveBeenCalled();
      wrapper.instance().getImg('5');
      expect(storage.getStoreRef).toHaveBeenCalledWith('images/5');
    })

    it('returns an image url', async () => {
      expect(await wrapper.instance().getImg('5')).toEqual('niceurl');
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