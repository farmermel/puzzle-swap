import React, { Component } from 'react';
import { connect } from 'react-redux';
import PuzzleCard from '../../components/PuzzleCard/PuzzleCard';
import { db, store } from '../../firebase';
import { setPuzzles } from '../../actions/setPuzzles';
import PropTypes from 'prop-types';
import './PuzzleContainer.css';

export class PuzzleContainer extends Component {
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

export const mapStateToProps = state => ({
  puzzles: state.puzzles
})

export const mapDispatchToProps = dispatch => ({
  setPuzzles: puzzles => dispatch(setPuzzles(puzzles))
})

PuzzleContainer.propTypes = {
  puzzles: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    numPieces: PropTypes.string,
    piecesMissing: PropTypes.string,
    imgUrl: PropTypes.string,
    puzzleId: PropTypes.number
  })),
  setPuzzles: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleContainer);