import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

import "styles/Role.scss";
import RoleModel from "models/RoleEto";

export default function Role({
  role,
  onRemove,
  onEdit,
}: {
  role: RoleModel;
  onRemove?: (id: string) => void;
  onEdit?: (role: RoleModel) => void;
}) {
  const { id, name, description } = role;

  return (
    <div className="Role">
      <Card className="root">
        <CardContent>
          <Typography className="name" color="textSecondary" gutterBottom>
            {name}
          </Typography>
          <Typography className="pos" color="textSecondary">
            .
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">{description}</Button>
        </CardActions>
        <div className="butttons">
          {!!onRemove && (
            <button onClick={() => onRemove(id)}>
              <DeleteForeverIcon color="error" />
            </button>
          )}
          {!!onEdit && (
            <button onClick={() => onEdit(role)}>
              <EditIcon />
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}
