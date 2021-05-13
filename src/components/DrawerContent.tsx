import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import 'styles/DrawerContent.scss';
import { Link } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import { canGetTasks, canGetUsers,} from 'permissions';

export default function DrawerContent() {
  const {authUser} = useAuth();
  const _canGetUsers: boolean = canGetUsers(authUser);
  const _canGetTasks: boolean = canGetTasks(authUser);

  return (
    <div className="DrawerContent">
      <h2>Menu</h2>
      <List>
			{_canGetTasks &&
        <ListItem button>
          <Link to="/tasks">
            <ListItemIcon>
              <AssignmentTurnedInIcon />
            </ListItemIcon>
            <ListItemText primary="My tasks" />
          </Link>
        </ListItem>
				}
				{_canGetUsers &&
        <ListItem button>
          <Link to="/admin/tasks">
            <ListItemIcon>
              <AssignmentTurnedInIcon />
            </ListItemIcon>
            <ListItemText primary="Admin tasks" />
          </Link>
        </ListItem>
				}
				{_canGetUsers &&
        <ListItem button>
          <Link to="/admin/users">
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Admin users" />
          </Link>
        </ListItem>
  			}
				{!authUser &&
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
				}
      </List>
			{authUser &&
			<>
				<Divider />
				<ListItem button>
					<ListItemIcon>
						<ExitToAppIcon />
					</ListItemIcon>
					<ListItemText primary="Log out" />
				</ListItem>
			</>
			}
    </div>
  );
}
