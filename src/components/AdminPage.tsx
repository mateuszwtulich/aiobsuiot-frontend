import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import AdminUsers from './AdminUsers';
import AdminTasks from './AdminTasks';

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
      </Switch>
    </Router>
  );
}
