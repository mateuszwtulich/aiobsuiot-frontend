import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isLoggedIn } from "services/authService";

export default function PrivateRoute({ component: Component, ...restProps }) {
  const hasAccess = isLoggedIn();
  return (
    <Route
      {...restProps}
      render={({ match: { url } }) =>
        hasAccess ? (
          <Component url={url} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
}
