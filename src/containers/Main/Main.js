import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGeoLocation } from '../../helpers/apiCalls';
import { addLocation } from '../../actions/addLocation';
import PuzzleContainer from '../../components/PuzzleContainer/PuzzleContainer';
import './Main.css';

class Main extends Component {
  async componentDidMount() {
    try {
      const { addLocation } = this.props;
      const city = await getGeoLocation();
      addLocation(city);
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { location = '' } = this.props;
    return (
      <div className='main'>
        <Link to={{ pathname: '/post-puzzle-form' }}>
          <button className='puzzle-post'>Post a Puzzle</button>
        </Link>
        <p>Viewing puzzles posted in {location}</p>
        <PuzzleContainer />
      </div>
    ) 
  }
}

const mapStateToProps = state => ({
  location: state.location
});

const mapDispatchToProps = dispatch => ({
  addLocation: location => dispatch(addLocation(location))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);