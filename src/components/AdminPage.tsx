import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AdminUsers from "./AdminUsers";
import AdminTasks from "./AdminTasks";
import AdminRoles from "./AdminRoles";
import Home from "./Home";
import Tasks from "./Tasks";

export default function AdminPage({ url }) {
  return (
    <Router>
      <Switch>
        <Route exact path={`${url}/tasks`}>
          <AdminTasks />
        </Route>
        <Route exact path={`${url}/users`}>
          <AdminUsers />
        </Route>
        <Route exact path={`${url}/roles`}>
          <AdminRoles />
        </Route>
        <Route exact path="/tasks">
          <Tasks />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
