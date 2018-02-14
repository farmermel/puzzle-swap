import React from 'react';
import { Link } from 'react-router-dom';
import PuzzleContainer from '../PuzzleContainer/PuzzleContainer';
import './Main.css';

const Main = () => {
  return (
    <div className='main'>
      <Link to={{ pathname: '/post-puzzle-form' }}>
        <button className='puzzle-post'>Post a Puzzle</button>
      </Link>
      <PuzzleContainer />
    </div>
  )
}

export default Main;