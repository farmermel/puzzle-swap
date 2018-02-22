/* eslint-disable */
import { locationReducer } from './locationReducer';
import { puzzlesReducer } from './puzzlesReducer';
import { usersChatsReducer } from './usersChatsReducer';
import { usersReducer } from './usersReducer';

describe('reducers', () => {
  describe('locationReducer', () => {
    it('returns state unchanged if action type passed in does not match a case', () => {
      const action = {
        type: 'NOT_A_MATCH',
        location: 'Denver'
      }
      
      expect(locationReducer('unchanged', action)).toEqual('unchanged');
    })

    it('adds location to state if action type is ADD_LOCATION', () => {
      const action = {
        type: 'ADD_LOCATION',
        location: 'Denver'
      }

      expect(locationReducer('', action)).toEqual('Denver');
    })
  })

  describe('puzzlesReducer', () => {
    it('returns state unchanged if action type passed in does not match a case', () => {
      const action = {
        type: 'NOT_A_MATCH',
        puzzles: [{}]
      }
      
      expect(puzzlesReducer('unchanged', action)).toEqual('unchanged');
    })

    it('returns state with puzzles passed in if action type matches a case', () => {
      const action = {
        type: 'SET_PUZZLES',
        puzzles: [{puzzle: 'yep!'}]
      }

      expect(puzzlesReducer('', action)).toEqual([{puzzle: 'yep!'}]);
    })
  })

  describe('usersChatsReducer', () => {
    it('returns state unchanged if action type passed in does not match a case', () => {
      const action = {
        type: 'NOT_A_MATCH',
        usersChats: [{}]
      }
      
      expect(usersChatsReducer('unchanged', action)).toEqual('unchanged');
    })

    it('returns state with chats passed in if action type matches case', () => {
      const action = {
        type: 'SET_USERS_CHATS',
        usersChats: [{chat: 'I am chat'}]
      }

      expect(usersChatsReducer('', action)).toEqual([{chat: 'I am chat'}]);
    })
  })

  describe('usersReducer', () => {
    it('returns state unchanged if action type passed in does not match a case', () => {
      const action = {
        type: 'NOT_A_MATCH',
        user: {username: 'case', uid: '5'}
      }
      
      expect(usersReducer('unchanged', action)).toEqual('unchanged');
    })

    it('returns state with user passed in if action type matches case', () => {
      const action = {
        type: 'SET_USER',
        user: {username: 'case', uid: '5'}
      }

      expect(usersReducer('', action)).toEqual({username: 'case', uid: '5'});
    })
  })
})