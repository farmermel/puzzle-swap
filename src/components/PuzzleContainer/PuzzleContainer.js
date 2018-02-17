import React, { Component } from 'react';
import { connect } from 'react-redux';
import PuzzleCard from '../PuzzleCard/PuzzleCard';
import { db, store } from '../../firebase';
import { setPuzzles } from '../../actions/setPuzzles';
import './PuzzleContainer.css';

class PuzzleContainer extends Component {
  componentDidMount = () => {
    const puzzlesData = this.retrievePuzzles();

    puzzlesData.on('value', snapshot => {
      this.parsePuzzles(snapshot.val())
    })
  }

  retrievePuzzles = () => {
    return db.watchData('puzzles')
  }

  parsePuzzles = async snapshot => {
    const puzzles = await Object.keys(snapshot).map(async puzzle => {
      const imgUrl = await this.getImg(snapshot[puzzle].puzzleId);
      snapshot[puzzle].imgUrl = imgUrl;
      return snapshot[puzzle];
    })
    const resolvedPuzzles = await Promise.all(puzzles)
    this.props.setPuzzles(resolvedPuzzles);
  }

  displayPuzzles = () => {
    const { puzzles } = this.props;
    return puzzles && puzzles.map( puzzle => {
      return <PuzzleCard puzzle={puzzle}
                         key={puzzle.puzzleId} />
    })
  }

  getImg = async (imgId) => {
    try{
      const ref = await store.getStoreRef(`images/${imgId}`)
      const imgUrl = await ref.getDownloadURL();
      return imgUrl;
    } catch (error) {
      console.log(error)
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

const mapStateToProps = state => ({
  puzzles: state.puzzles
})

const mapDispatchToProps = dispatch => ({
  setPuzzles: puzzles => dispatch(setPuzzles(puzzles))
})

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleContainer);