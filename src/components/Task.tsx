import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

import TaskModel from 'models/Task';

import 'styles/Task.scss';

export default function Task({ task, onRemoveTask, onEditTask }: {task: TaskModel, onRemoveTask?, onEditTask?}) {
  const {
    id, name, userTo, finalDate,
  } = task;

  return (
    <div className="Task">
      <Card className="root">
        <CardHeader
          subheader={finalDate}
        />
        <CardContent>
          <Typography
            className="name"
            color="textSecondary"
            gutterBottom
          >
            {name}
          </Typography>
          <Typography
            className="pos"
            color="textSecondary"
          >
            .
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">{`${userTo.name} ${userTo.surname}`}</Button>
        </CardActions>
        <div className="butttons">
          {!!onRemoveTask && (
          <button
            onClick={() => onRemoveTask(id)}
          >
            <DeleteForeverIcon color="error" />
          </button>
          )}
          {!!onEditTask && (
          <button
            onClick={() => onEditTask(id)}
          >
            <EditIcon />
          </button>
          )}
        </div>
      </Card>
    </div>
  );
}
