import React, { Component } from 'react';
import { db } from '../../firebase';

class PostPuzzleForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      numPieces: '',
      piecesMissing: '',
      error: null
    }
  }

  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handlePhoto = (files: FileList) => {
    const puzzleImg = window.URL.createObjectURL(files[0])
    this.setState({ puzzleImg });
  }

  postPuzzleToBackend = (e) => {
    e.preventDefault();
    try {
      const postData = {...this.state}
      const firebaseKey = db.getFirebaseKey('puzzles');
      let updates = {};
      updates[`/puzzles/${firebaseKey}`] = postData;
      return db.postUpdate(updates);
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  render() {

  // <form action='https://formspree.io/melenasuliteanu@gmail.com'
  //   className='sign-up'
  //   method='post'>
    return (
      <div className='form-wrapper'>
        {
          this.state.error && <p>{this.state.error}</p>
        }
        <form onSubmit={this.postPuzzleToBackend}>
          <label htmlFor='puzzle-name'>Puzzle Name</label>
            <input type='text' placeholder='puzzle title'
                   value={this.state.title}
                   name='title'
                   id='puzzle-name'
                   onChange={this.handleChange}
                   required />
          <label htmlFor='puzzle-img'>Upload a puzzle photo</label>
            <input type='file' 
                   accept='image/x-png,image/jpeg'
                   name='puzzleImg' 
                   onChange={(e) => this.handlePhoto(e.target.files)}
                   id='puzzle-img'
                   required />
          <label htmlFor='num-pieces'>Number of pieces</label>
            <input type='number' placeholder='number of pieces'
                   value={this.state.numPieces}
                   name='numPieces'
                   id='num-pieces'
                   onChange={this.handleChange}
                   required />
          <label htmlFor='missing'>Number of pieces missing</label>
            <select name='piecesMissing'
                    id='missing'
                    onChange={this.handleChange}
                    required>
              <option value='1-3'>1-3</option>
              <option value='4-9'>4-9</option>
              <option value='10 or more'>10 or more</option>
            </select>
          <button>Post puzzle</button>
        </form>
      </div>
    )
  }
}

export default PostPuzzleForm;