import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { auth } from '../../firebase';
import { setUser } from '../../actions/usersActions';
import Main from '../../containers/Main/Main';
import Header from '../../containers/Header/Header';
import PostPuzzleForm from '../PostPuzzleForm/PostPuzzleForm';
import Login from '../../containers/Login/Login';
import SignUp from '../../containers/SignUp/SignUp';
import Messages from '../Messages/Messages';
import PropTypes from 'prop-types';
import './App.css';

class App extends Component {
  componentDidMount = () => {
    const { setUser } = this.props;
    auth.onAuthStateChanged(authUser => {
      authUser ? setUser(authUser) : setUser(null);
    })
  }

  render() {
    const { user } = this.props;
    return (
      <div className="App">
        <Header user={ this.props.user }/>
        <Switch>
          <Route exact path='/' component={ Main } />
          <Route path='/post-puzzle-form' component={ PostPuzzleForm } />
          <Route path='/login' render={() => 
            user ? <Redirect to='/' /> : <Login />
          } />
          <Route path='/sign-up' render={() => 
            user ? <Redirect to='/' /> : <SignUp />
          } />
          <Route path='/messages' component={ Messages } />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user))
})

App.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
