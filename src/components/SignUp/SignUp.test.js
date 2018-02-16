import React from 'react';
import { shallow } from 'enzyme';
import { SignUp, mapDispatchToProps } from './SignUp';

describe('SignUp', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SignUp setLogin={jest.fn()} />)
  })

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('handleChange', () => {
    it('sets state with event passed in', () => {

    })
  })

  describe('handleSubmit', () => {
    it('prevents default', () => {

    })

    it('calls auth\'s create user method', () => {

    })

    it('calls db\'s create user method', () => {

    })

    it('calls setLogin', () => {

    })

    it('sets state with error if either create user method fails', () => {

    })
  })

  describe('mapDispatchToProps', () => {
    it('maps dispatch to props', () => {
      
    })
  })
})