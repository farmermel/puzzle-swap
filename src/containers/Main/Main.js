import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGeoLocation } from '../../helpers/apiCalls';
import { addLocation } from '../../actions/addLocation';
import { hasErrored } from '../../actions/hasErrored';
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
        { 
          user && <Link to={{ pathname: '/post-puzzle-form' }}>
            <button className='puzzle-post'>Post a Puzzle</button>
          </Link>
        }
        <p className='view-description'>Viewing puzzles posted in {location}</p>
        <PuzzleContainer />
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