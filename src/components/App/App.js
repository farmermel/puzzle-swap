import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Main from '../../containers/Main/Main';
import Header from '../Header/Header';
import PostPuzzleForm from '../PostPuzzleForm/PostPuzzleForm';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Messages from '../Messages/Messages';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header loggedIn={ this.props.loggedIn }/>
        <Switch>
          <Route exact path='/' component={ Main } />
          <Route path='/post-puzzle-form' component={ PostPuzzleForm } />
          <Route path='/login' render={() => 
            this.props.loggedIn ? <Redirect to='/' /> : <Login />
          } />
          <Route path='/sign-up' render={() => 
            this.props.loggedIn ? <Redirect to='/' /> : <SignUp />
          } />
          <Route path='/messages' component={ Messages } />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn
});

export default withRouter(connect(mapStateToProps, null)(App));
