import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './App.scss';
import Login from 'components/Login';
import Signup from 'components/Signup';
import Home from 'components/Home';
import Tasks from 'components/Tasks';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/tasks">
            <Tasks />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
