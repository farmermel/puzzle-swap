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
    return (
      <form>
        <input type='text' placeholder='puzzle title'
               value={this.state.title}
               name='title'
               onChange={(e) => this.handleChange(e)} />
        <input type='file' accept='image/x-png,image/jpeg' />
        <p>please upload a photo of puzzle (png or jpg)</p>
        <input type='number' placeholder='number of pieces'
               value={this.state.numPieces}
               name='numPieces'
               onChange={(e) => this.handleChange(e)} />
        <select name='piecesMissing'
                onChange={(e) => this.handleChange(e)}>
          <option value='1-3'>1-3</option>
          <option value='4-9'>4-9</option>
          <option value='10 or more'>10 or more</option>
        </select>
      </form>
    )
  }
}

export default PostPuzzleForm;