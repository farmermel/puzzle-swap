/* eslint-disable */
import * as apiCalls from './apiCalls';

describe('apiCalls', () => {
  let mockResolve;
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation((url) => {
      return Promise.resolve({
        status: 200,
        json: () => mockResolve
      })
    })
  })
  describe('getGeoLocation', () => {
    it('calls fetch', async () => {
      mockResolve = {
        location: {
          lat: 0.9,
          lng: 0.9,
        },
        results: [
          { 
            types: ['locality'],
            address_components: [{
              short_name: 'Denver'
            }]
          }
        ]
      }
      await apiCalls.getGeoLocation();
      expect(window.fetch).toHaveBeenCalled();
    })

    it('throws an error if status code is above 200', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500
      }))
      expect(apiCalls.getGeoLocation()).rejects.toEqual(Error('failed to retrieve geolocation: Error: Bad status code'))
    })
  })
})