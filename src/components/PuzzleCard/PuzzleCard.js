import React, { Component } from 'react';
import { store } from '../../firebase';
import './PuzzleCard.css';


const getImg = async (imgId) => {
  try{
    const ref = await store.getStoreRef(`images/${imgId}`)
    const imgUrl = await ref.getDownloadURL();
    return imgUrl;
  } catch (error) {
    console.log(error)
  }
}

class PuzzleCard extends Component {
  constructor() {
    super();
    this.state = {
      imgUrl: ''
    }
  }

  componentDidMount = async () => {
    const { puzzle } = this.props;
    const { puzzleId } = puzzle
    try{
      const ref = await store.getStoreRef(`images/${puzzleId}`)
      const imgUrl = await ref.getDownloadURL();
      // return imgUrl;
      this.setState({imgUrl})
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { puzzle } = this.props;
    const styleObj = {
      backgroundImage: `url(${this.state.imgUrl})`
    }
    return (
      <article className='puzzle-card'>
        <div className='puzzle-img' style={styleObj}></div>
        <h3>{puzzle.title}</h3>
        <p>{puzzle.numPieces}</p>
        <p>{puzzle.piecesMissing}</p>
        <button className='claim'>Claim</button>
      </article>
    )
  }
}

// const getImg = async (imgId) => {
//   try{
//     const ref = await store.getStoreRef(`images/${imgId}`)
//     const imgUrl = await ref.getDownloadURL();
//     return imgUrl;
//   } catch (error) {
//     console.log(error)
//   }
// }

// const PuzzleCard = ({ puzzle }) => {
// console.log(puzzle)
//   return (
//     <article className='puzzle-card'>
//       <img src={getImg(puzzle.puzzleId)} 
//            alt={`${puzzle.title} puzzle`}
//            className='puzzle-img' />
//       <h3>{puzzle.title}</h3>
//       <p>{puzzle.numPieces}</p>
//       <p>{puzzle.piecesMissing}</p>
//       <button className='claim'>Claim</button>
//     </article>
//   )
// }

export default PuzzleCard;