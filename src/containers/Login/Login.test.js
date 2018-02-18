import React from 'react';
import { shallow } from 'enzyme';
import { Login, mapDispatchToProps } from './Login';

describe('Login', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login setLogin={jest.fn()} />);

  })

  it('matches snapshot', () => {
    expect(wrapper).toBeDefined();
  })

  it('has default state', () => {

  })

  describe('handleChange', () => {
    it('sets state with event passed in', () => {

    })
  })

  describe('handleSubmit', () => {
    it('prevents event default', () => {

    })

    it('calls auth\'s sign in method', () => {

    })

    it('calls setLogin with argument true', () => {

    })

    it('sets state with an error message if signin fails', () => {

    })
  })

  describe('mapDispatchToProps', () => {
    it('maps dispatch to props', () => {
      
    })
  })
})