import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { db, storage } from '../../firebase';
import ReactCrop from 'react-image-crop';
import { getCroppedImg } from '../../helpers/cropImg';
import 'react-image-crop/dist/ReactCrop.css';

export class PostPuzzleForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      numPieces: '',
      piecesMissing: '0',
      fileUpload: 'Select puzzle photo',
      crop: {
        aspect: 10/7,
        height: 35,
        width: 50,
        x: 0,
        y: 0
      } 
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handlePhoto = (files: FileList) => {
    const puzzleImg = files[0];
    const imageUrl = URL.createObjectURL(puzzleImg);
    files[0] && this.setState({ 
                  imageUrl,
                  fileUpload: files[0].name
                })
  }

  postToDB = puzzleId => {
    const { userId, hasErrored, userLocation } = this.props;
    try {
      const { title, numPieces, piecesMissing } = this.state;
      const postDB = { title, numPieces, piecesMissing, puzzleId, userId, userLocation }
      const firebaseKey = db.getFirebaseKey('puzzles');
      let updates = {};
      updates[`/puzzles/${firebaseKey}`] = postDB;
      return db.postUpdate(updates);
    } catch (error) {
      hasErrored(error.message);
    }
  }

  postToCloudStore = () => {
    const { hasErrored } = this.props;
    try {
      const { croppedImg } = this.state;
      const puzzleId = Date.now();
      const ref = storage.getStoreRef(`images/${puzzleId}`);
      storage.putInStore(ref, croppedImg);
      return puzzleId;
    } catch (error) {
      hasErrored(error.message);
    }
  }

  postPuzzleToFirebase = async e => {
    e.preventDefault();
    try {
      const puzzleId = await this.postToCloudStore();
      await this.postToDB(puzzleId);
      this.props.history.push('/');
    } catch (error) {
      const { hasErrored } = this.props;
      hasErrored(error.message);
    }
  }

  handleCropChange = crop => {
    this.setState({ crop });
  }

  handleCropComplete = async (crop, pixelCrop) => {
    const { hasErrored } = this.props;
    try {
      const image = document.createElement('img');
      image.src = this.state.imageUrl;
      const croppedImgBlob = await getCroppedImg(image, pixelCrop, this.state.fileUpload);
      const croppedImg = new File([croppedImgBlob], this.state.fileUpload);
      this.setState({ croppedImg });
    } catch (error) {
      hasErrored(error.message);
    }
  }

  renderCrop = () => {
    return (
      <div className='crop-wrap'>
        <label htmlFor='crop-img'
               className='crop-label'>Crop your image</label>
        <ReactCrop src={ this.state.imageUrl }
                   crop={ this.state.crop }
                   onChange={ crop => this.handleCropChange(crop) }
                   onComplete={ (crop, pixelCrop) => this.handleCropComplete(crop, pixelCrop) }
                   id='crop-img' />
      </div>
    )
  }

  render() {
    return (
      <div className='form-wrapper'>
        {
          this.state.error && <p>{ this.state.error }</p>
        }
        <form onSubmit={ this.postPuzzleToFirebase }>
          <label htmlFor='puzzle-name'>Puzzle Name</label>
            <input type='text' placeholder='puzzle title'
                   value={ this.state.title }
                   name='title'
                   id='puzzle-name'
                   onChange={ this.handleChange }
                   required />
          <label htmlFor='puzzle-img'
                 id='img-submit-label'>{ this.state.fileUpload }</label>
            <input type='file' 
                   accept='image/x-png,image/jpeg'
                   name='puzzleImg' 
                   onChange={(e) => this.handlePhoto(e.target.files)}
                   id='puzzle-img'
                   required />
          {
            this.state.imageUrl && this.renderCrop()
          }
          <label htmlFor='num-pieces'>Number of pieces</label>
            <input type='number' placeholder='number of pieces'
                   value={ this.state.numPieces }
                   name='numPieces'
                   id='num-pieces'
                   onChange={ this.handleChange }
                   required />
          <label htmlFor='missing'>Number of pieces missing</label>
            <select name='piecesMissing'
                    id='missing'
                    onChange={this.handleChange}
                    required>
              <option value='0'>0</option>
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

PostPuzzleForm.propTypes = {
  userId: PropTypes.string.isRequired,
  hasErrored: PropTypes.func.isRequired,
  userLocation: PropTypes.string
}

export default withRouter(PostPuzzleForm);