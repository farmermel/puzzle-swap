import React from 'react';
import PropTypes from 'prop-types';
import './PuzzleCard.css';

const determineDisable = (handleClaim, handleDelete, puzzleId, ownerId, userId) => {
  return ownerId === userId 
    ? renderDelete(handleDelete, puzzleId) 
    : renderClaim(handleClaim, ownerId);
}

const renderDelete = (handleDelete, puzzleId) => {
  return (
    <button onClick={() => handleDelete(puzzleId)}
            className='claim'>Unlist</button>
  )
}

const renderClaim = (handleClaim, ownerId) => {
  return (
    <button onClick={() => handleClaim(ownerId)}
            className='claim'>Claim</button>
  )
}

const PuzzleCard = ({ handleClaim, handleDelete, puzzle, user }) => {
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
            ? determineDisable(handleClaim, handleDelete, puzzleId, ownerId, user.uid)
            : <button>Sign in to claim</button>
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

export default PuzzleCard;