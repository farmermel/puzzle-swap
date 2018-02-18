import React from 'react';
import { shallow } from 'enzyme';
import { PostPuzzleForm } from './PostPuzzleForm';

describe('PostPuzzleForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PostPuzzleForm />);
  })

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('has default state', () => {
    const expected = {
      "title": "",
      "numPieces": "", 
      "piecesMissing": "1-3", 
      "error": null 
    }
    expect(wrapper.instance().state).toEqual(expected);
  })

  describe('handleChange', () => {
    it('sets state with event passed in', () => {
      
    })
  })

  describe('handlePhoto', () => {
    it('sets state with a File', () => {

    })
  })

  describe('postToDB', () => {
    it('calls getFirebaseKey method of database with pathway \'puzzles\' as argument', () => {

    })

    it('calls postUpdate method of database with an updates object as argument', () => {

    })
  })

  describe('postToCloudStore', () => {
    it('calls getStoreRef on ')
  })
})