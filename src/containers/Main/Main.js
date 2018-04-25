import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGeoLocation } from '../../helpers/apiCalls';
import { addLocation, hasErrored } from '../../actions';
import PuzzleContainer from '../PuzzleContainer/PuzzleContainer';
import PropTypes from 'prop-types';
import './Main.css';

export class Main extends Component {
  constructor() {
    super();
    this.state = {
      puzzleFilter: 'all',
    }
  }

  async componentDidMount() {
      const { addLocation, hasErrored } = this.props;
    try {
      const city = await getGeoLocation();
      addLocation(city);
    } catch (error) {
      hasErrored(error.message);
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { location = '', user } = this.props;
    return (
      <div className='main'>
        <p className='view-description'>Viewing puzzles posted in {location}</p>
        <div className='flex-container'>
          <PuzzleContainer />
        </div>
      </div>
    ) 
  }
}

export const mapStateToProps = state => ({
  location: state.location,
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  addLocation: location => dispatch(addLocation(location)),
  hasErrored: message => dispatch(hasErrored(message))
});

Main.propTypes = {
  location: PropTypes.string,
  user: PropTypes.objectOf(PropTypes.string),
  addLocation: PropTypes.func.isRequired,
  hasErrored: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);