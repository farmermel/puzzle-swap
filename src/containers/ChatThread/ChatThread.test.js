import React from 'react';
import { shallow } from 'enzyme';
import { ChatThread, mapStateToProps, mapDispatchToProps } from './ChatThread';
import { db } from '../../firebase';

describe('ChatThread', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ChatThread user={{username: 'Nymeria', uid: '1'}}
                                  chat={{members: {1: {name: 'Nymeria', uid: '1'}, 2: {name: 'Arya', uid: '2'}}, chatId: '4'}}
                                  hasErrored={jest.fn()} />,
                      {disableLifecycleMethods: true})
  })
  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('has default state', () => {
    const expected = {
      message: '',
      messagesToRender: []
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

    it('calls watches chat data in db', () => {
      expect(db.watchData).not.toHaveBeenCalled();
      wrapper.instance().componentDidMount();
      expect(db.watchData).toHaveBeenCalledWith('messages/4');
    })

    it('catches error and calls hasErrored error message if anything errors', async () => {
      db.watchData = jest.fn().mockImplementation(() => {
        throw new Error('failed to reach database')
      }); 
      await wrapper.instance().componentDidMount();
      expect(wrapper.instance().props.hasErrored).toHaveBeenCalledWith('failed to reach database');
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

  describe('getMembers', () => {
    it('returns a comma seperated string of the values from an object passed in', () => {
      const mockMembers = {
        4: 'Nymeria',
        5: 'Arya'
      };
      const expected = 'Nymeria, Arya';
    })
  })

  describe('makeUpdatesObj', () => {
    it('returns an updates object with three urls as keys and last message, time, and message details as values', () => {
      const expected = {"chats/4/lastMessage": "", "chats/4/timeStamp": "4:00", "messages/4/key": {"message": "", "timeStamp": "4:00", "uid": "1", "username": "Nymeria"}}
      wrapper.instance().formatTime = jest.fn().mockImplementation(() => {
        return '4:00'
      })
      expect(wrapper.instance().makeUpdatesObj('key')).toEqual(expected)
    })
  })

  describe('handleSubmit', () => {
    let mockEvent;
    let mockUpdates;
    beforeEach(() => {
      db.getFirebaseKey = jest.fn().mockImplementation(() => {
        return 4
      })
      db.postUpdate = jest.fn();
      mockEvent = {
        preventDefault: jest.fn()
      }
      mockUpdates = {
        messages: [],
        lastMessage: 'hey',
        timeStamp: '4:00'
      }
    })

    it('prevents default of form submission', () => {
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
      wrapper.instance().handleSubmit(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    })

    it('gets firebase key from db', () => {
      expect(db.getFirebaseKey).not.toHaveBeenCalled();
      wrapper.instance().handleSubmit(mockEvent);
      expect(db.getFirebaseKey).toHaveBeenCalled();
    })

    it('calls makeUpdatesObject', () => {
      wrapper.instance().makeUpdatesObj = jest.fn();
      expect(wrapper.instance().makeUpdatesObj).not.toHaveBeenCalled();
      wrapper.instance().handleSubmit(mockEvent);
      expect(wrapper.instance().makeUpdatesObj).toHaveBeenCalled();
    })

    it('clears message in state', () => {
      wrapper.instance().setState({ message: 'valhar morgulis' });
      expect(wrapper.instance().state.message).toEqual('valhar morgulis');
      wrapper.instance().handleSubmit(mockEvent);
      expect(wrapper.instance().state.message).toEqual('');
    })

    it('calls postUpdate on database', () => {
      wrapper.instance().makeUpdatesObj = jest.fn().mockImplementation(() => {
        return mockUpdates;
      });
      expect(db.postUpdate).not.toHaveBeenCalled();
      wrapper.instance().handleSubmit(mockEvent);
      expect(db.postUpdate).toHaveBeenCalledWith(mockUpdates);
    })

    it('catches error and calls hasErrored error message if anything errors', async () => {
      db.getFirebaseKey = jest.fn().mockImplementation(() => {
        throw new Error('failed to get key')
      }); 
      await wrapper.instance().handleSubmit(mockEvent);
      expect(wrapper.instance().props.hasErrored).toHaveBeenCalledWith('failed to get key');
    })
  })

  describe('determineMessageColor', () => {
    it('returns an object with member ids as keys and classnames as values', () => {
      const expected = {1: 'speech-right', 2: 'speech-left'};
      expect(wrapper.instance().determineMessageColor()).toEqual(expected)
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
      const expected = <h3 className="no-messages">Introduce yourself!</h3>
      wrapper.instance().renderMessages(undefined);
      expect(wrapper.instance().state.messagesToRender).toEqual(expected);
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

  describe('mapDispatchToProps', () => {
    it('maps dispatch to props', () => {
      const mockDispatch = jest.fn();
      const mapped = mapDispatchToProps(mockDispatch);
      mapped.hasErrored();
      expect(mockDispatch).toHaveBeenCalled();
    })
  })
})