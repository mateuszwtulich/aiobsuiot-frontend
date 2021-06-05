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
            <PrivateRoute component={Tasks} exact path="/tasks" />
            <PrivateRoute component={AdminPage} exact path="/admin" />
            <OnlyPublicRoute component={Login} exact path="/login" />
            <OnlyPublicRoute component={Signup} exact path="/signup" />
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
