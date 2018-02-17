import React, { Component } from 'react';
import { connect } from 'react-redux';
import PuzzleCard from '../PuzzleCard/PuzzleCard';
import { db, store } from '../../firebase';
import './PuzzleContainer.css';

class PuzzleContainer extends Component {
  constructor() {
    super()
    this.state = {
      puzzles: ''
    }
  }

  componentDidMount = () => {
    const puzzlesData = this.retrievePuzzles();

    const puzzles = puzzlesData.on('value', snapshot => {
      this.parsePuzzles(snapshot.val())
    })
  }

  retrievePuzzles = () => {
    return db.watchData('puzzles')
  }

  // getImg = async (imgId) => {
  //   try{
  //     const ref = await store.getStoreRef(`images/${imgId}`)
  //     const imgUrl = await ref.getDownloadURL();
  //     return imgUrl;
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  parsePuzzles = snapshot => {
    const puzzlesDisplay = Object.keys(snapshot).map( puzzle => {
      return (
        <PuzzleCard puzzle={snapshot[puzzle]} /> 
      )
    })
    this.setState({ puzzles: puzzlesDisplay })
  }

  // parsePuzzles = async snapshot => {
  //   const puzzlesDisplay = await Object.keys(snapshot).map( async puzzle => {
  //     const imgUrl = await this.getImg(snapshot[puzzle].puzzleId)
  //     console.log(snapshot[puzzle])
  //     return (
  //       <PuzzleCard puzzle={snapshot[puzzle]}
  //                   img={imgUrl} /> 
  //     )
  //   })
  //   console.log('puzzles', puzzlesDisplay)
  //   await this.setState({ puzzles: puzzlesDisplay })
  // }

  render() {
    return (
      <div className='puzzle-container'>
        {this.state.puzzles || <div>loading</div>}
      </div>
    )
  }
}

export default PuzzleContainer;