import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import './PuzzleCard.css';

const determineDisable = (handleClaim, handleDelete, puzzleId, ownerId, userId, puzzleTitle) => {
  return ownerId === userId 
    ? renderDelete(handleDelete, puzzleId) 
    : renderClaim(handleClaim, ownerId, puzzleTitle);
}

const renderDelete = (handleDelete, puzzleId) => {
  return (
    <button onClick={() => handleDelete(puzzleId)}
            className='claim'>Unlist</button>
  )
}

const renderClaim = (handleClaim, ownerId, puzzleTitle) => {
  return (
    <button onClick={() => handleClaim(ownerId, puzzleTitle)}
            className='claim'>Claim</button>
  )
}

const PuzzleCard = ({ handleClaim, handleDelete, puzzle, user, history }) => {
  const inlineStyles = {
    backgroundImage: `url(${puzzle.imgUrl})`
  }
  const { puzzleId, userId: ownerId } = puzzle;
  return (
    <article className='puzzle-card'>
      <div className='puzzle-img' style={inlineStyles}></div>
      <div className='puzzle-txt-wrap'>
        <h3>{puzzle.title}</h3>
        <p>Pieces: {puzzle.numPieces}</p>
        <p>Pieces missing: {puzzle.piecesMissing}</p>
        {
          user 
            ? determineDisable(handleClaim, handleDelete, puzzleId, ownerId, user.uid, puzzle.title)
            : <button className='claim'
                      onClick={() => history.push('/login')}>Log in to claim</button>
        }
      </div>
    </article>
  )
}

PuzzleCard.propTypes = {
  puzzle: PropTypes.shape({
    title: PropTypes.string,
    numPieces: PropTypes.string,
    piecesMissing: PropTypes.string,
    imgUrl: PropTypes.string,
    puzzleId: PropTypes.number
  }),
  handleClaim: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default withRouter(PuzzleCard);