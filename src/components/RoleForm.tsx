import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Delete from "@material-ui/icons/Delete";
import Permission from "models/Permission";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import "styles/RoleForm.scss";
import ErrorMessage from "components/ErrorMessage";
import Role from "models/RoleEto";

import { MISSING_FORM_VALUES, NO_PERMISSION_SELECTED } from "consts/errors";

export default function RoleForm({
  role,
  permissions: availablePermissions,
  submit,
}: {
  role: Role | null;
  permissions: Permission[];
  submit: (role) => void;
}) {
  const [isPermissionSelectVisible, setPermissionSelectVisible] =
    useState<boolean>(false);
  const [newPermission, setNewPermission] = useState<Permission | null>(null);
  const [name, setName] = useState<string>(role?.name ?? "");
  const [description, setDescription] = useState<string>(
    role?.description ?? ""
  );
  const [rolePermissions, setRolePermissions] = useState<Permission[]>(
    role ? role.permissionEtoList : []
  );
  const [error, setError] = useState<string | null>(null);

  const isFormValid = () =>
    name.trim().length > 0 && description.trim().length > 0;

  const handleSave = () => {
    if (!isFormValid()) {
      setError(MISSING_FORM_VALUES);
      return;
    }

    setError(null);
    const newRole = {
      ...role,
      name,
      description,
      permissionEtoList: rolePermissions,
    };

    submit(newRole);
  };

  const handleRolePermission = (id: string) => {
    setRolePermissions(
      rolePermissions.filter((permission) => permission.id !== id)
    );
  };

  return (
    <form className="RoleForm" onSubmit={handleSave}>
      <h2>{!!role ? "Edit role" : "Add new role"}</h2>
      <TextField
        required
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        required
        fullWidth
        label="Descroption"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="permissions">
        <h2>Role permissions</h2>
        {rolePermissions.map(({ id, name, description }) => (
          <div className="permission">
            <div className="details">
              <h3 className="name">{name}</h3>
              <h6 className="description">{description}</h6>
            </div>
            <button onClick={() => handleRolePermission(id)}>
              <Delete color="error" />
            </button>
          </div>
        ))}
      </div>
      <br />

      {isPermissionSelectVisible ? (
        <div className="new-permission-select">
          <FormControl variant="outlined">
            <InputLabel id="select-outlined-label">Permission</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={newPermission?.id}
              onChange={(e) => {
                const newPerm = availablePermissions.find(
                  (permission) => permission.id === e.target.value
                );

                setNewPermission(newPerm ?? null);
              }}
              label="Permission"
            >
              {availablePermissions
                .filter((p) => !rolePermissions.some(({ id }) => id === p.id))
                .map((permission) => (
                  <MenuItem key={permission.id} value={permission.id}>
                    {permission.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => {
              if (newPermission) {
                setRolePermissions([...rolePermissions, newPermission!]);
                setPermissionSelectVisible(false);
                setError(null);
              } else {
                setError(NO_PERMISSION_SELECTED);
              }
            }}
          >
            Add +
          </Button>
        </div>
      ) : (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => setPermissionSelectVisible(true)}
        >
          Add new permission
        </Button>
      )}

      <ErrorMessage error={error} />
      <div className="buttons">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </form>
  );
}
