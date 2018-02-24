import React from 'react';
import { shallow } from 'enzyme';
import { ChatThread, mapStateToProps } from './ChatThread';
import { db } from '../../firebase';

describe('ChatThread', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ChatThread user={{username: 'Nymeria', uid: 4}}
                                  chat={{members: {1: 'Nymeria', 2: 'Arya'}, chatId: '4'}}/>,
                      {disableLifecycleMethods: true})
  })
  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('has default state', () => {
    const expected = {
      message: '',
      messagesToRender: [],
      error: null
    };
    expect(wrapper.instance().state).toEqual(expected);
  })

  describe('componentDidMount', () => {
    beforeEach(() => {
      db.watchData = jest.fn().mockImplementation(() => {
        return {
          on: jest.fn()
        }
      })
      wrapper.instance().renderMessages = jest.fn();
    })

    afterAll(() => {
      db.getFirebaseKey.mockClear();
    })

    it('calls watchData method on db with messages/chatid', () => {
      expect(db.watchData).not.toHaveBeenCalled();
      wrapper.instance().componentDidMount();
      expect(db.watchData).toHaveBeenCalledWith('messages/4');
    })
  })

  describe('getMembers', () => {
    it('returns a comma seperated string of the values from an object passed in', () => {
      const mockMembers = {
        4: 'Nymeria',
        5: 'Arya'
      };
      const expected = 'Nymeria, Arya';
    })
  })

  describe('handleChange', () => {
    it('sets state with name and value of event passed in', () => {
      const mockEvent = {
        target: {
          name: 'message',
          value: 'Valhar morgulis'
        }
      }
      wrapper.instance().handleChange(mockEvent);
      expect(wrapper.instance().state.message).toEqual('Valhar morgulis');
    })
  })

  describe('handleSubmit', () => {
    let mockEvent;
    beforeEach(() => {
      db.getFirebaseKey = jest.fn().mockImplementation(() => {
        return 4
      })
      db.postUpdate = jest.fn();
      mockEvent = {
        preventDefault: jest.fn()
      }
    })

    it('prevents default of form submission', () => {
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
      wrapper.instance().handleSubmit(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    })

    it('calls getFirebaseKey method on db', () => {
      expect(db.getFirebaseKey).not.toHaveBeenCalled();
      wrapper.instance().handleSubmit(mockEvent);
      expect(db.getFirebaseKey).toHaveBeenCalled();
    })

    it('clears message in state', () => {
      wrapper.instance().setState({ message: 'valhar morgulis' });
      expect(wrapper.instance().state.message).toEqual('valhar morgulis');
      wrapper.instance().handleSubmit(mockEvent);
      expect(wrapper.instance().state.message).toEqual('');
    })

    it('calls postUpdate on database with an updates object containing three keys for different updates', () => {
      expect(db.postUpdate).not.toHaveBeenCalled();
      wrapper.instance().handleSubmit(mockEvent);
      expect(db.postUpdate).toHaveBeenCalled();
    })

    it('sets state with error if something goes wrong', () => {
      db.postUpdate = jest.fn().mockImplementation(() => {
        throw new Error('valhar doharis')
      })
      wrapper.instance().handleSubmit(mockEvent);
      expect(wrapper.instance().state.error).toEqual('valhar doharis');
    })
  })

  describe('renderMessages', () => {
    let mockMessages;
    beforeAll(() => {
      wrapper.instance().determineMessageColor = jest.fn().mockImplementation(() => {
        return { 
          5: 'yellow',
          6: 'green'
        }
      })
      mockMessages = {
        5: {
          timeStamp: 4,
          username: 'Nymeria',
          message: 'Arroooooo',
          uid: 5
        },
        6: {
          timeStamp: 7,
          username: 'Aria',
          message: 'Needle!',
          uid: 6
        }
      }
    })

    it('sets state with messages to render if there are messages', () => {
      const expected = [<article className={undefined}><div><p>4</p><h3>Nymeria</h3></div><p>Arroooooo</p></article>, <article className={undefined}><div><p>7</p><h3>Aria</h3></div><p>Needle!</p></article>]
      wrapper.instance().renderMessages(mockMessages);
      expect(typeof wrapper.instance().state.messagesToRender).toEqual(typeof expected);
    })

    it('sets state with instructions to introduce yourself if there are no messages', () => {
      const expected = <h3>Introduce yourself!</h3>
      wrapper.instance().renderMessages(undefined);
      expect(wrapper.instance().state.messagesToRender).toEqual(expected);
    })
  })

  describe('determineMessageColor', () => {
    it('returns an object with member ids as keys and classnames as values', () => {
      const expected = {1: 'speech-right', 2: 'speech-left'};
      expect(wrapper.instance().determineMessageColor()).toEqual(expected)
    })
  })

  describe('mapStateToProps', () => {
    it('maps state to props', () => {
      const mockState = {
        user: 'Nymeria'
      }
      const mapped = mapStateToProps(mockState);
      expect(mapped.user).toEqual(mockState.user);
    })
  })
})