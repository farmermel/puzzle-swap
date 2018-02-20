import { addLocation } from './addLocation';
import { setPuzzles } from './setPuzzles';
import { setUsersChats } from './userChats';
import { setUser } from './usersActions';

describe('actions', () => {
  describe('addLocation', () => {
    it('returns an action object with type ADD_LOCATION and location passed in', () => {
      const expected = { type: 'ADD_LOCATION', location: 'Denver' };
      expect(addLocation('Denver')).toEqual(expected);
    })
  })

  describe('setPuzzles', () => {
    it('returns an action object with type SET_PUZZLES and puzzles passed in', () => {
      const puzzles = [{title: 'witch', userId: '5', numPieces: '12'}];
      const expected = { type: 'SET_PUZZLES', puzzles};
      expect(setPuzzles(puzzles)).toEqual(expected);
    })
  })

  describe('setUsersChats', () => {
    it('returns an action object with type SET_USERS_CHATS and users chats passed in', () => {
      const chats = [{}, {}];
      const expected = { type: 'SET_USERS_CHATS', usersChats: chats };
      expect(setUsersChats(chats)).toEqual(expected);
    })
  })

  describe('setUser', () => {
    it('returns an action object with type SET_USER and user passed in', () => {
      const user = { username: 'Case', id: '4' };
      const expected = { type: 'SET_USER', user };
      expect(setUser(user)).toEqual(expected);
    })
  })
})