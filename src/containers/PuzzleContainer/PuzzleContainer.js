import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hasErrored } from '../../actions/hasErrored';
import { setPuzzles } from '../../actions/setPuzzles';
import { withRouter } from 'react-router';
import PuzzleCard from '../../components/PuzzleCard/PuzzleCard';
import { db, storage } from '../../firebase';
import PropTypes from 'prop-types';
import './PuzzleContainer.css';

export class PuzzleContainer extends Component {
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
    const { hasErrored } = this.props;
    try {
      const chatsSnapshot = await db.getOnce('chats');
      const chats = chatsSnapshot.val();
      const existingChat = this.parseChats(chats, ownerId, claimerId);
      return existingChat ? chats[existingChat] : null;
    } catch (error) {
      hasErrored(error.message);
    }
  }

  goToChat = existingChat => {
    this.props.history.push(`messages/${existingChat.chatId}`)
  }

  getUserNames = async (ownerId, claimerId) => {
    const { hasErrored } = this.props;
    try {
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
    } catch (error) {
      hasErrored(error.message);
    }
  }

  makeNewChat = async (ownerId, claimerId) => {
    const { hasErrored } = this.props;
    try {
      const firebaseKey = await db.getFirebaseKey('chats');
      const userNames = await this.getUserNames(ownerId, claimerId);
      const timeStamp = Date.now();
      const postDB = {
        members: userNames,
        timeStamp,
        lastMessage: '',
        chatId: firebaseKey
      }
      let updates = {};
      updates[`chats/${firebaseKey}`] = postDB;
      await db.postUpdate(updates);
      this.checkForExistingChat();
    } catch (error) {
      hasErrored(error.message);
    }
  }

  handleClaim = async (puzzleId, ownerId) => {
    const { user, hasErrored } = this.props;
    try {
      const claimerId = user.uid;
      const existingChat = await this.checkForExistingChat(ownerId, claimerId);
      existingChat ? this.goToChat(existingChat) : await this.makeNewChat(ownerId, claimerId);
    } catch (error) {
      hasErrored(error.message);
    }
  }

  handleDelete = async puzzleId => {
    const { hasErrored } = this.props;
    try {
      const puzzlesSnap = await db.getOnce('puzzles');
      const puzzles = puzzlesSnap.val();
      const puzzle = Object.keys(puzzles).find( puzzle => puzzles[puzzle].puzzleId === puzzleId);
      await db.deleteData(`puzzles/${puzzle}`);
    } catch (error) {
      hasErrored(error.message);
    }
  }

  retrievePuzzles = () => {
    try {
      return db.watchData('puzzles');
    } catch (error) {
      hasErrored(error.message);
    }
  }

  parsePuzzles = async snapshot => {
    const { hasErrored } = this.props;
    try {
      const puzzles = await Object.keys(snapshot).map(async puzzle => {
        const imgUrl = await this.getImg(snapshot[puzzle].puzzleId);
        snapshot[puzzle].imgUrl = imgUrl;
        return snapshot[puzzle];
      })
      const resolvedPuzzles = await Promise.all(puzzles)
      this.props.setPuzzles(resolvedPuzzles);
    } catch (error) {
      hasErrored(error.message);
    }
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

  getImg = async imgId => {
    const { hasErrored } = this.props;
    try{
      const ref = await storage.getStoreRef(`images/${imgId}`)
      const imgUrl = await ref.getDownloadURL();
      return imgUrl;
    } catch (error) {
      hasErrored(error.message);
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
  user: state.user,
  userLocation: state.location
})

export const mapDispatchToProps = dispatch => ({
  setPuzzles: puzzles => dispatch(setPuzzles(puzzles)),
  hasErrored: message => dispatch(hasErrored(message))
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
  setPuzzles: PropTypes.func.isRequired,
  hasErrored: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PuzzleContainer));