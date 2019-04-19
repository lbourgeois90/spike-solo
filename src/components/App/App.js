import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route} from 'react-router-dom';
import CreateActivator from '../CreateActivator/CreateActivator';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
         <h1> Spike Project</h1>
        </header>
        <Route exact path='/' component={CreateActivator}/>
      </div>
      </Router>
    );
  }
}

export default App;
