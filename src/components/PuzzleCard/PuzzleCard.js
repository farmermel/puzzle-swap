import React from 'react';
import PropTypes from 'prop-types';
import './PuzzleCard.css';

const PuzzleCard = ({ puzzle }) => {
  const inlineStyles = {
    backgroundImage: `url(${puzzle.imgUrl})`
  }
  return (
    <article className='puzzle-card'>
      <div className='puzzle-img' style={inlineStyles}></div>
      <h3>{puzzle.title}</h3>
      <p>{puzzle.numPieces}</p>
      <p>{puzzle.piecesMissing}</p>
      <button className='claim'>Claim</button>
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
  })
}

export default PuzzleCard;