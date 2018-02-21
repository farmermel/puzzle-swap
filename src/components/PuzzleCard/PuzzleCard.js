import React from 'react';
import PropTypes from 'prop-types';
import './PuzzleCard.css';

const determineDisable = (puzzleId, userId) => {
  return puzzleId === userId ? true : false;
}

const PuzzleCard = ({ puzzle, handleClaim, user }) => {
  const inlineStyles = {
    backgroundImage: `url(${puzzle.imgUrl})`
  }
  const { puzzleId, userId } = puzzle;
  return (
    <article className='puzzle-card'>
      <div className='puzzle-img' style={inlineStyles}></div>
      <h3>{puzzle.title}</h3>
      <p>Pieces: {puzzle.numPieces}</p>
      <p>Pieces missing: {puzzle.piecesMissing}</p>
      {
        user 
          ? <button onClick={() => handleClaim(puzzleId, userId)}
                    disabled={determineDisable(puzzle.userId, user.uid)}
                    className='claim'>Claim</button>
          : <h3>Sign in to claim</h3>
      }
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
  handleClaim: PropTypes.func.isRequired
}

export default PuzzleCard;