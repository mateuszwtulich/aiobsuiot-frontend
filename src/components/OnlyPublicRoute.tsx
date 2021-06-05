import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "services/authService";

export default function OnlyPublicRoute({
  component: Component,
  ...restProps
}) {
  const hasAccess = !isLoggedIn();
  return (
    <Route
      {...restProps}
      render={(props) =>
        hasAccess ? (
          <Component props={props} />
        ) : (
          <Redirect to={{ pathname: "/tasks" }} />
        )
      }
    />
  );
}
