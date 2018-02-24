import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PuzzleCard from '../../components/PuzzleCard/PuzzleCard';
import { db, storage } from '../../firebase';
import { setPuzzles } from '../../actions/setPuzzles';
import PropTypes from 'prop-types';
import './PuzzleContainer.css';

export class PuzzleContainer extends Component {
  constructor() {
    super();
    this.state = {
      error: null
    }
  }

  componentDidMount = () => {
    const puzzlesData = this.retrievePuzzles();

    puzzlesData.on('value', snapshot => {
      this.parsePuzzles(snapshot.val())
    })
  }

  parseChats = (chats, ownerId, claimerId) => {
    return Object.keys(chats).find( chat => {
      return chats[chat].members[ownerId] && chats[chat].members[claimerId];
    })
  }

  checkForExistingChat = async (ownerId, claimerId) => {
    try {
      const chatsSnapshot = await db.getOnce('chats');
      const chats = chatsSnapshot.val();
      const existingChat = this.parseChats(chats, ownerId, claimerId);
      return existingChat ? chats[existingChat] : null;
    } catch (error) {
      console.log(error)
    }
  }

  goToChat = existingChat => {
    this.props.history.push(`messages/${existingChat.chatId}`)
  }

  getUserNames = async (ownerId, claimerId) => {
    const allUsersSnap = await db.getOnce('users');
    const allUsers = allUsersSnap.val();
    return Object.keys(allUsers).reduce((userNames, user) => {
      if (user === ownerId || user === claimerId) {
        userNames[user] = { 
          username: allUsers[user].username,
          email: allUsers[user].email
        }
      }
      return userNames;
    }, {})
  }

  makeNewChat = async (ownerId, claimerId) => {
    try {
      const firebaseKey = await db.getFirebaseKey('chats');
      const userNames = await this.getUserNames(ownerId, claimerId);
      console.log('usernames', userNames)
      const timeStamp = Date.now();
      const postDB = {
        members: userNames,
        timeStamp,
        lastMessage: '',
        chatId: firebaseKey
      }
      let updates = {};
      updates[`chats/${firebaseKey}`] = postDB;
      // updates[`messages/${firebaseKey}`]
      await db.postUpdate(updates);
      this.checkForExistingChat();
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  handleClaim = async (puzzleId, ownerId) => {
    const { user } = this.props;
    const claimerId = user.uid;
    const existingChat = await this.checkForExistingChat(ownerId, claimerId);
    existingChat ? this.goToChat(existingChat) : await this.makeNewChat(ownerId, claimerId);
  }

  handleDelete = async puzzleId => {
    const puzzlesSnap = await db.getOnce('puzzles');
    const puzzles = puzzlesSnap.val();
    const puzzle = Object.keys(puzzles).find( puzzle => puzzles[puzzle].puzzleId === puzzleId);
    await db.deleteData(`puzzles/${puzzle}`)
  }

  retrievePuzzles = () => {
    return db.watchData('puzzles');
  }

  parsePuzzles = async snapshot => {
    const puzzles = await Object.keys(snapshot).map(async puzzle => {
      const imgUrl = await this.getImg(snapshot[puzzle].puzzleId);
      snapshot[puzzle].imgUrl = imgUrl;
      return snapshot[puzzle];
    })
    const resolvedPuzzles = await Promise.all(puzzles)
    this.props.setPuzzles(resolvedPuzzles);
  }

  displayPuzzles = () => {
    const { puzzles, user } = this.props;
    return puzzles && puzzles.map( puzzle => {
      return <PuzzleCard puzzle={ puzzle }
                         handleClaim={ this.handleClaim }
                         handleDelete={ this.handleDelete }
                         user={ user }
                         key={ puzzle.puzzleId } />
    })
  }

  getImg = async (imgId) => {
    try{
      const ref = await storage.getStoreRef(`images/${imgId}`)
      const imgUrl = await ref.getDownloadURL();
      return imgUrl;
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className='puzzle-container'>
        {this.displayPuzzles() || <div>loading</div>}
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  puzzles: state.puzzles,
  user: state.user
})

export const mapDispatchToProps = dispatch => ({
  setPuzzles: puzzles => dispatch(setPuzzles(puzzles))
})

PuzzleContainer.propTypes = {
  puzzles: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    numPieces: PropTypes.string,
    piecesMissing: PropTypes.string,
    imgUrl: PropTypes.string,
    puzzleId: PropTypes.number
  })),
  user: PropTypes.objectOf(PropTypes.string),
  setPuzzles: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PuzzleContainer));