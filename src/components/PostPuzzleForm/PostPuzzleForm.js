import React, { Component } from 'react';

class PostPuzzleForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      numPieces: '',
      piecesMissing: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {

  // <form action='https://formspree.io/melenasuliteanu@gmail.com'
  //   className='sign-up'
  //   method='post'>
    return (
      <div className='form-wrapper'>
        <form>
          <label htmlFor='puzzle-name'>Puzzle Name</label>
            <input type='text' placeholder='puzzle title'
                   value={this.state.title}
                   name='title'
                   id='puzzle-name'
                   onChange={this.handleChange} />
          <label htmlFor='puzzle-file'>Upload a puzzle photo</label>
            <input type='file' accept='image/x-png,image/jpeg' id='puzzle-file' />
          <label htmlFor='num-pieces'>Number of pieces</label>
            <input type='number' placeholder='number of pieces'
                   value={this.state.numPieces}
                   name='numPieces'
                   id='num-pieces'
                   onChange={this.handleChange} />
          <label htmlFor='missing'>Number of pieces missing</label>
            <select name='piecesMissing'
                    id='missing'
                    onChange={this.handleChange}>
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