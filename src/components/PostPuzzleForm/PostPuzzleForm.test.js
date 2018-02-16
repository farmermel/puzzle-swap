import React from 'react';
import { shallow } from 'enzyme';
import PostPuzzleForm from './PostPuzzleForm';

describe('PostPuzzleForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PostPuzzleForm />);
  })

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('has default state', () => {

  })

  describe('handleChange', () => {
    it('sets state with event passed in', () => {
      
    })
  })
})