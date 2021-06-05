import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import "styles/Home.scss";
import Header from "components/Header";
import Wrapper from "components/Wrapper";
import { useAuth } from "contexts/AuthContext";
import {
  canEditTask,
  canGetRoles,
  canGetTasks,
  canGetUsers,
} from "permissions";

export default function Home() {
  const { authUser } = useAuth();
  const _canGetUsers: boolean = canGetUsers(authUser);
  const _canGetTasks: boolean = canGetTasks(authUser);
  const _canEditTask: boolean = canEditTask(authUser);
  const _canGetRoles: boolean = canGetRoles(authUser);

  return (
    <div className="Home">
      <Header title="Home" />
      <Wrapper className="content">
        <h2>Welcome</h2>
        <div className="buttons">
          {!authUser && (
            <>
              <Button variant="contained" color="primary" size="large">
                <Link to="/login">Log in</Link>
              </Button>
              <Button variant="contained" color="primary" size="large">
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
          {_canGetTasks && (
            <Button variant="contained" color="primary" size="large">
              <Link to="/tasks">My tasks</Link>
            </Button>
          )}
          {_canEditTask && (
            <Button variant="contained" color="primary" size="large">
              <Link to="/admin/tasks">Admin tasks</Link>
            </Button>
          )}
          {_canGetUsers && (
            <Button variant="contained" color="primary" size="large">
              <Link to="/admin/users">Admin users</Link>
            </Button>
          )}
          {_canGetRoles && (
            <Button variant="contained" color="primary" size="large">
              <Link to="/admin/roles">Admin roles</Link>
            </Button>
          )}
        </div>
      </Wrapper>
    </div>
  );
}
