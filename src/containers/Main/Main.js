import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGeoLocation } from '../../helpers/apiCalls';
import { addLocation } from '../../actions/addLocation';
import PuzzleContainer from '../../components/PuzzleContainer/PuzzleContainer';
import './Main.css';

export class Main extends Component {
  constructor() {
    super();
    this.state = {
      puzzleFilter: 'all',
      error: null
    }
  }

  async componentDidMount() {
    try {
      const { addLocation } = this.props;
      const city = await getGeoLocation();
      addLocation(city);
    } catch (error) {
      this.setState({
        error: error.message
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  generateSelect = () => {
    return (
      <select name='puzzleFilter'
                    onChange={(e) => this.handleChange(e)}
                    id='puzzle-filter'>
        <option value='all'>all</option>
        <option value='300-750'>300-750</option>
        <option value='1000'>1000</option>
        <option value='1100 or more'>1100 or more</option>
      </select>
    )
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
        <p className='view-description'>Viewing {this.generateSelect()} piece puzzles posted in {location}</p>
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
  addLocation: location => dispatch(addLocation(location))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);