import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from 'services/authService';

export default function PrivateRoute({ component: Component, onlyAdminAccess = false, ...restProps }) {
  const hasAccess = onlyAdminAccess ? (() => true)() : isLoggedIn();
  return (
    <Route
      {...restProps}
      render={(props) => (hasAccess ? <Component props={props} /> : <Redirect to={{ pathname: '/login' }} />)}
    />
  );
}
