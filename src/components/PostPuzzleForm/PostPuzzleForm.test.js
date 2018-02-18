import React from 'react';
import { shallow } from 'enzyme';
import { db, storage } from '../../firebase';
import { PostPuzzleForm } from './PostPuzzleForm';

describe('PostPuzzleForm', () => {
  let wrapper;
  const mockHistory = {
    push: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallow(<PostPuzzleForm history={mockHistory} />);
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
      const mockEvent = {
        target: {
          name: 'name',
          value: 'Nymeria'
        }
      }
      wrapper.instance().handleChange(mockEvent);
      expect(wrapper.instance().state.name).toEqual('Nymeria');
    })
  })

  describe('handlePhoto', () => {
    it('sets state with a File', () => {
      const FileList = [
        1,
        2
      ]
      wrapper.instance().handlePhoto(FileList);
      expect(wrapper.instance().state.puzzleImg).toEqual(1);
    })
  })

  describe('postToDB', () => {
    beforeEach(() => {
      db.getFirebaseKey = jest.fn().mockImplementation(() => {
        return '5'
      })
      db.postUpdate = jest.fn()
    })

    it('calls getFirebaseKey method of database with pathway \'puzzles\' as argument', () => {
      expect(db.getFirebaseKey).not.toHaveBeenCalled();
      wrapper.instance().postToDB();
      expect(db.getFirebaseKey).toHaveBeenCalledWith('puzzles');
    })

    it('calls postUpdate method of database with an updates object as argument', () => {
      const updatesObj = {
        "/puzzles/5": 
        {
          "numPieces": "", 
          "piecesMissing": "1-3", 
          "puzzleId": undefined, 
          "title": ""
        }
      }
      expect(db.postUpdate).not.toHaveBeenCalled();
      wrapper.instance().postToDB();
      expect(db.postUpdate).toHaveBeenCalledWith(updatesObj);
    })
  })

  describe('postToCloudStore', () => {
    storage.getStoreRef = jest.fn();
    Date.now = jest.fn().mockImplementation(() => {
      return 5
    })

    it('calls getStoreRef on storage with a url as parameter', () => {
      expect(storage.getStoreRef).not.toHaveBeenCalled();
      wrapper.instance().postToCloudStore();
      expect(storage.getStoreRef).toHaveBeenCalledWith('images/5');
    })

    it('returns a generated puzzleId', () => {
      expect(wrapper.instance().postToCloudStore()).toEqual(5)
    })
  })

  describe('postPuzzleToFirebase', () => {
    const mockEvent = {
      preventDefault: jest.fn()
    } 
    beforeEach(() => {
      wrapper.instance().postToCloudStore = jest.fn();
      wrapper.instance().postToDB = jest.fn(); 
    }) 

    it('calls prevent default on event passed in', () => {
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
      wrapper.instance().postPuzzleToFirebase(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    })

    it('calls postToCloudStore', () => {
      expect(wrapper.instance().postToCloudStore).not.toHaveBeenCalled();
      wrapper.instance().postPuzzleToFirebase(mockEvent);
      expect(wrapper.instance().postToCloudStore).toHaveBeenCalled();
    })

    it('calls postToDB', async () => {
      expect(wrapper.instance().postToDB).not.toHaveBeenCalled();
      await wrapper.instance().postPuzzleToFirebase(mockEvent);
      expect(wrapper.instance().postToDB).toHaveBeenCalled();
    })

    it('calls push on history object with \'/\' as argument', async () => {
      wrapper.instance().props.history.push.mockClear();
      expect(wrapper.instance().props.history.push).not.toHaveBeenCalled();
      await wrapper.instance().postPuzzleToFirebase(mockEvent);
      expect(wrapper.instance().props.history.push).toHaveBeenCalledWith('/');
    })

    it('catches error and sets state with error message if anything errors', async () => {
      wrapper.instance().postToDB = jest.fn().mockImplementation(() => {
        throw new Error('failed to post to database')
      }); 
      await wrapper.instance().postPuzzleToFirebase(mockEvent);
      expect(wrapper.instance().state.error).toEqual('failed to post to database');
    })
  })
})