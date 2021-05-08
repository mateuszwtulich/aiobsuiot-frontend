import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component: Component, onlyAdminAccess = false, ...restProps }) {
  const hasAccess = onlyAdminAccess ? (() => true)() : (() => true)();
  return (
    <Route
      {...restProps}
      render={(props) => (hasAccess ? <Component props={props} /> : <Redirect to={{ pathname: '/login' }} />)}
    />
  );
}
