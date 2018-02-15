import React from 'react';
import './PuzzleCard.css';

const PuzzleCard = () => {
  return (
    <article className='puzzle-card'>
      <h3>Witch Puzzle</h3>
      <p>1,000 pieces</p>
      <p>1-3 pieces missing</p>
      <button className='claim'>Claim</button>
    </article>
  )
}

export default PuzzleCard;