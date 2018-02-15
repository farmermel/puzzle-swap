import { locationReducer } from './locationReducer';

describe('reducers', () => {
  describe('locationReducer', () => {
    it('returns state unchanged if action type passed in does not match a case', () => {
      const action = {
        type: 'NOT_A_MATCH',
        location: 'Denver'
      }
      
      expect(locationReducer('unchanged', action)).toEqual('unchanged');
    })

    it('adds location to state if action type os ADD_LOCATION', () => {
      const action = {
        type: 'ADD_LOCATION',
        location: 'Denver'
      }

      expect(locationReducer('', action)).toEqual('Denver')
    })
  })
})