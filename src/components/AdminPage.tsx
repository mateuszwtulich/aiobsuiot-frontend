import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AdminUsers from "./AdminUsers";
import AdminTasks from "./AdminTasks";
import AdminRoles from "./AdminRoles";

export default function AdminPage() {
  return (
    <Router>
      <Switch>
        <Route path="/admin/tasks">
          <AdminTasks />
        </Route>
        <Route path="/admin/users">
          <AdminUsers />
        </Route>
        <Route path="/admin/roles">
          <AdminRoles />
        </Route>
      </Switch>
    </Router>
  );
}
