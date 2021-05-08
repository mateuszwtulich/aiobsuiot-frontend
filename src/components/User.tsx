import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import 'styles/User.scss';

export default function User({ user, onUserRemove }) {
  const {
    id, name, surname, role,
  } = user;

  return (
    <div className="User">
      <Card className="root">
        <CardContent>
          <Typography
            className="title"
            color="textSecondary"
            gutterBottom
          >
            {`${name} ${surname}`}
          </Typography>
          <Typography
            className="body2"
            variant="body2"
            component="p"
          >
            {role}
          </Typography>
        </CardContent>
        <button
          className="remove-btn"
          onClick={() => onUserRemove(id)}
        >
          <DeleteForeverIcon color="error" />
        </button>
      </Card>
    </div>
  );
}
