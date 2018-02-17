import React from 'react';
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

export default PuzzleCard;