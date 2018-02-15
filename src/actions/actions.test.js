import { addLocation } from './addLocation';

describe('actions', () => {
  describe('addLocation', () => {
    it('returns an action object with type ADD_LOCATION and location passed in', () => {
      const expected = { type: 'ADD_LOCATION', location: 'Denver' }
      expect(addLocation('Denver')).toEqual(expected);
    })
  })
})