import React from 'react';
import { shallow } from 'enzyme';
import { Main,
mapDispatchToProps,
mapStateToProps } from './Main';

describe('Main', () => {
  let wrapper;
  let mockResponse
  beforeEach(() => {
    wrapper = shallow(<Main addLocation={jest.fn()}
                            location='' />, {disableLifecycleMethods: true})
    window.fetch = jest.fn().mockImplementation( url => {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockResponse)
      })
    })
  })

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('has default state', () => {

  })

  describe('componentDidMount', () => {
    it('calls getGeoLocation', () => {

    })

    it('calls addLocation', () => {

    })

    it('sets state with error message if getGeoLocatoin fails', () => {

    })
  })

  describe('handleChange', () => {
    it('sets state with event passed in', () => {

    })
  })

  describe('mapStateToProps', () => {
    it('maps state to props', () => {

    })
  })

  describe('mapDispatchToProps', () => {
    it('maps dispatch to props', () => {
      
    })
  })
})