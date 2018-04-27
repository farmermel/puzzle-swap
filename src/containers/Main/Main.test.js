import React from 'react';
import { shallow } from 'enzyme';
import { Main,
mapDispatchToProps,
mapStateToProps } from './Main';
import * as apiCalls from '../../helpers/apiCalls';

describe('Main', () => {
  let wrapper;
  let mockResponse
  beforeEach(() => {
    wrapper = shallow(<Main addLocation={jest.fn()}
                            location=''
                            hasErrored={jest.fn()} />, {disableLifecycleMethods: true})
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
    const expected =  {puzzleFilter: 'all'};
    expect(wrapper.instance().state).toEqual(expected);
  })

  describe('componentDidMount', () => {
    it('calls getGeoLocation', () => {
      apiCalls.getGeoLocation = jest.fn().mockImplementation(() => 'Denver')
      expect(apiCalls.getGeoLocation).not.toHaveBeenCalled()
      wrapper.instance().componentDidMount();
      expect(apiCalls.getGeoLocation).toHaveBeenCalled()
    })

    it('calls addLocation', async () => {
      expect(wrapper.instance().props.addLocation).not.toHaveBeenCalled();
      await wrapper.instance().componentDidMount();
      expect(wrapper.instance().props.addLocation).toHaveBeenCalled();
    })

    it('calls hasErrored with error message if getGeoLocation fails', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject({
        status: 500,
        message: 'you\'re a genius'
      }))
      apiCalls.getGeoLocation = jest.fn().mockImplementation(() => window.fetch());
      await wrapper.instance().componentDidMount();
      expect(wrapper.instance().props.hasErrored).toHaveBeenCalledWith('you\'re a genius');
    })
  })

  // describe('handleChange', () => {
  //   it('sets state with event passed in', () => {
  //     const mockEvent = {
  //       target: {
  //         name: 'Casey',
  //         value: 'very high'
  //       }
  //     }

  //     wrapper.instance().handleChange(mockEvent);
  //     expect(wrapper.instance().state.Casey).toEqual('very high');
  //   })
  // })

  describe('mapStateToProps', () => {
    it('maps state to props', () => {
      const mockStore = {
        location: 'Denver',
        user: 'Casey'
      }
      const mapped = mapStateToProps(mockStore);
      expect(mapped).toEqual(mockStore)
    })
  })

  describe('mapDispatchToProps', () => {
    it('maps dispatch to props', () => {
      const mockDispatch = jest.fn();
      const mapped = mapDispatchToProps(mockDispatch);
      expect(mockDispatch).not.toHaveBeenCalled();
      mapped.addLocation();
      expect(mockDispatch).toHaveBeenCalled();
    })
  })
})