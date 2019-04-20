import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route} from 'react-router-dom';
import CreateActivator from '../CreateActivator/CreateActivator';
import StudentSide from '../StudentSide/StudentSide';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
        </header>
        <Route exact path='/' component={CreateActivator}/>
        <Route path='/student' component={StudentSide}/>
      </div>
      </Router>
    );
  }
}

export default App;
