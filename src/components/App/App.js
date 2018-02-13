import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from '../Main/Main';
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
        <Header />
        <Switch>
          <Route exact path='/' component={ Main } />
          <Route path='/post-puzzle-form' component={ PostPuzzleForm } />
          <Route path='/login' component={ Login } />
          <Route path='/sign-up' component={ SignUp } />
          <Route path='/messages' component={ Messages } />

        </Switch>
      </div>
    );
  }
}

export default App;
