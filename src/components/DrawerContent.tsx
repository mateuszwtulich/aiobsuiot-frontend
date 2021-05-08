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

export default function DrawerContent() {
  return (
    <div className="DrawerContent">
      <List>
        <ListItem button>
          <ListItemIcon>
            <AssignmentTurnedInIcon />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
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
