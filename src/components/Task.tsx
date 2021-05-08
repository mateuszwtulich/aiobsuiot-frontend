import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import 'styles/Task.scss';

export default function Task({ title, text }: {title: string, text?: string}) {
  const bull = <span className="bullet">•</span>;

  return (
    <div className="Task">
      <Card className="root">
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
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}
