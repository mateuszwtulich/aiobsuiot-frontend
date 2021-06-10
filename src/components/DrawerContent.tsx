import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import GroupIcon from "@material-ui/icons/Group";
import AccessibilityNew from "@material-ui/icons/AccessibilityNew";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import "styles/DrawerContent.scss";
import { useAuth } from "contexts/AuthContext";
import { canGetRoles, canGetTasks, canGetUsers } from "permissions";
import { signOut } from "services/authService";

export default function DrawerContent() {
  const { authUser } = useAuth();
  const _canGetUsers: boolean = canGetUsers(authUser);
  const _canGetTasks: boolean = canGetTasks(authUser);
  const _canGetRoles: boolean = canGetRoles(authUser);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="DrawerContent">
      <h2>Menu</h2>
      <List>
        {_canGetTasks && (
          <ListItem button>
            <Link to="/tasks">
              <ListItemIcon>
                <AssignmentTurnedInIcon />
              </ListItemIcon>
              <ListItemText primary="My tasks" />
            </Link>
          </ListItem>
        )}
        {_canGetTasks && (
          <ListItem button>
            <Link to="/admin/tasks">
              <ListItemIcon>
                <AssignmentTurnedInIcon />
              </ListItemIcon>
              <ListItemText primary="All tasks" />
            </Link>
          </ListItem>
        )}
        {_canGetUsers && (
          <ListItem button>
            <Link to="/admin/users">
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </Link>
          </ListItem>
        )}
        {_canGetRoles && (
          <ListItem button>
            <Link to="/admin/roles">
              <ListItemIcon>
                <AccessibilityNew />
              </ListItemIcon>
              <ListItemText primary="Roles" />
            </Link>
          </ListItem>
        )}
        {!authUser && (
          <>
            <ListItem button>
              <Link to="/login">
                <ListItemIcon>
                  <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText primary="Log in" />
              </Link>
            </ListItem>
            <ListItem button>
              <Link to="/signup">
                <ListItemIcon>
                  <LockOpenIcon />
                </ListItemIcon>
                <ListItemText primary="Sign up" />
              </Link>
            </ListItem>
          </>
        )}
      </List>
      {authUser && (
        <>
          <Divider />
          <ListItem button onClick={handleSignOut}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </>
      )}
    </div>
  );
}
