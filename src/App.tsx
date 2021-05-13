import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './App.scss';
import AdminPage from 'components/AdminPage';
import Login from 'components/Login';
import Signup from 'components/Signup';
import Home from 'components/Home';
import Tasks from 'components/Tasks';
import PrivateRoute from 'components/PrivateRoute';
import { AuthProvider } from 'contexts/AuthContext';

function App() {
  return (
    <div className="App">
			<AuthProvider>
      <Router>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <PrivateRoute
            component={Tasks}
            path="/tasks"
          />
          <PrivateRoute
            component={AdminPage}
            path="/admin"
          />
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
			</AuthProvider>
    </div>
  );
}

export default App;
