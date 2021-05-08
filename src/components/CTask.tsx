import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Typography from '@material-ui/core/Typography';

import 'styles/Task.scss';

export default function CTask({
  title, user, finalDate, text,
}: {title: string, user: string, finalDate:Date, text?: string}) {
  const bull = <span className="bullet">•</span>;

  return (
    <div className="Task">
      <Card className="root">
        <CardHeader
          action={(
            <IconButton aria-label="settings">
              <MoreVertIcon>
                a co to
              </MoreVertIcon>
            </IconButton>
          )}
          title={title}
          subheader={finalDate.toDateString()}
        />
        <CardContent>
          <Typography
            className="title"
            color="textSecondary"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            className="pos"
            color="textSecondary"
          >
            .
          </Typography>
          <Typography
            className="body2"
            variant="body2"
            component="p"
          >
            {bull}
            {text}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">{user}</Button>
        </CardActions>
      </Card>
    </div>
  );
}
