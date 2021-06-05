import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import AdminPage from "components/AdminPage";
import Login from "components/Login";
import Signup from "components/Signup";
import Home from "components/Home";
import Tasks from "components/Tasks";
import PrivateRoute from "components/PrivateRoute";
import { AuthProvider } from "contexts/AuthContext";
import OnlyPublicRoute from "components/OnlyPublicRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <OnlyPublicRoute component={Login} path="/login" />
            <OnlyPublicRoute component={Signup} path="/signup" />
            <PrivateRoute component={Tasks} path="/tasks" />
            <PrivateRoute component={AdminPage} path="/admin" />
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
