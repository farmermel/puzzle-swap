import React from 'react';
import { shallow } from 'enzyme';
import { db, storage } from '../../firebase';
import { PostPuzzleForm } from './PostPuzzleForm';
import * as cropHelper from '../../helpers/cropImg';

describe('PostPuzzleForm', () => {
  let wrapper;
  const mockHistory = {
    push: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallow(<PostPuzzleForm history={mockHistory}
                                      userId='4'
                                      hasErrored={jest.fn()} />);
  })

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('has default state', () => {
    const expected = {
      fileUpload: "Select puzzle photo", 
      numPieces: "", 
      piecesMissing: "0", 
      title: "",
      crop: {
        aspect: 10/7,
        height: 35,
        width: 50,
        x: 0,
        y: 0
      }
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
      URL.createObjectURL = jest.fn().mockImplementation(() => {
        return 'I\'m an image'
      })
      const FileList = [
        {name: 'dragon puzzle'},
        {name: 'unicorn puzzle'}
      ]
      wrapper.instance().handlePhoto(FileList);
      expect(wrapper.instance().state.imageUrl).toEqual('I\'m an image');
      expect(wrapper.instance().state.fileUpload).toEqual('dragon puzzle');
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
          numPieces: "", 
          piecesMissing: "0", 
          puzzleId: undefined, 
          title: "",
          userId: '4'
        }
      }
      expect(db.postUpdate).not.toHaveBeenCalled();
      wrapper.instance().postToDB();
      expect(db.postUpdate).toHaveBeenCalledWith(updatesObj);
    })

    it('catches error and calls hasErrored error message if anything errors', async () => {
      db.getFirebaseKey = jest.fn().mockImplementation(() => {
        throw new Error('failed to post to database')
      }); 
      await wrapper.instance().postToDB('4');
      expect(wrapper.instance().props.hasErrored).toHaveBeenCalledWith('failed to post to database');
    })
  })

  describe('postToCloudStore', () => {
    storage.getStoreRef = jest.fn().mockImplementation(() => {
      return 'ref'
    });
    storage.putInStore = jest.fn();
    Date.now = jest.fn().mockImplementation(() => {
      return 5
    })

    it('calls getStoreRef on storage with a url as parameter and putInStore with ref and puzzleimg as arguments', () => {
      wrapper.instance().state.croppedImg = 'puzzleImg';
      expect(storage.getStoreRef).not.toHaveBeenCalled();
      expect(storage.putInStore).not.toHaveBeenCalled();
      wrapper.instance().postToCloudStore();
      expect(storage.getStoreRef).toHaveBeenCalledWith('images/5');
      expect(storage.putInStore).toHaveBeenCalledWith('ref', 'puzzleImg');
    })

    it('returns a generated puzzleId', () => {
      expect(wrapper.instance().postToCloudStore()).toEqual(5)
    })

    it('catches error and calls hasErrored error message if anything errors', async () => {
      storage.getStoreRef = jest.fn().mockImplementation(() => {
        throw new Error('failed to post to database')
      }); 
      await wrapper.instance().postToCloudStore();
      expect(wrapper.instance().props.hasErrored).toHaveBeenCalledWith('failed to post to database');
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

    it('catches error and calls hasErrored error message if anything errors', async () => {
      wrapper.instance().postToDB = jest.fn().mockImplementation(() => {
        throw new Error('failed to post to database')
      }); 
      await wrapper.instance().postPuzzleToFirebase(mockEvent);
      expect(wrapper.instance().props.hasErrored).toHaveBeenCalledWith('failed to post to database');
    })
  })

  describe('handleCropChange', () => {
    it('sets state with crop passed in', () => {
      const mockStartCrop = {
        aspect: 10/7,
        height: 35,
        width: 50,
        x: 0,
        y: 0
      }
      const mockChangedCrop = {
        aspect: 10/7,
        height: 14,
        width: 20,
        x: 5,
        y: 10
      }
      expect(wrapper.instance().state.crop).toEqual(mockStartCrop);
      wrapper.instance().handleCropChange(mockChangedCrop);
      expect(wrapper.instance().state.crop).toEqual(mockChangedCrop);
    })
  })

  describe('handleCropComplete', () => {
    beforeAll(() => {
      cropHelper.getCroppedImg = jest.fn().mockImplementation(() => {
        return 'blob:http://localhose:3000/e4e674f8-4b25-4947-a46e-6b338b47d2f5'
      })
    })

    it('calls getCroppedImg with an html image element, a pixelCrop, and a filename', () => {
      expect(cropHelper.getCroppedImg).not.toHaveBeenCalled();
      wrapper.instance().handleCropComplete(wrapper.instance().state.crop, {width: 800, height: 900, x: 14, y: 4});
      expect(cropHelper.getCroppedImg).toHaveBeenCalled();
    })

    it('sets state with a croppedImg File', async () => {
      await wrapper.instance().handleCropComplete(wrapper.instance().state.crop, {width: 800, height: 900});
      expect(typeof wrapper.instance().state.croppedImg).toEqual('object');
    })

    it('catches error and calls hasErrored error message if anything errors', async () => {
      cropHelper.getCroppedImg = jest.fn().mockImplementation(() => {
        throw new Error('failed to post to database')
      }); 
      await wrapper.instance().handleCropComplete({}, {});
      expect(wrapper.instance().props.hasErrored).toHaveBeenCalledWith('failed to post to database');
    })
  })
})