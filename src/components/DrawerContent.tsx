import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import 'styles/DrawerContent.scss';
import { Link } from 'react-router-dom';

export default function DrawerContent() {
  return (
    <div className="DrawerContent">
      <h2>Menu</h2>
      <List>
        <ListItem button>
          <Link to="/tasks">
            <ListItemIcon>
              <AssignmentTurnedInIcon />
            </ListItemIcon>
            <ListItemText primary="My tasks" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="/admin/tasks">
            <ListItemIcon>
              <AssignmentTurnedInIcon />
            </ListItemIcon>
            <ListItemText primary="Admin tasks" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="/admin/users">
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Admin users" />
          </Link>
        </ListItem>
      </List>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Log out" />
      </ListItem>
    </div>
  );
}
