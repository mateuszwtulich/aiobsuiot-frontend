import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "styles/UserForm.scss";
import User from "models/User";
import validateEmail from "utils/validateEmail";
import ErrorMessage from "components/ErrorMessage";
import {
  INVALID_EMAIL,
  INVALID_PASSWORDS,
  MISSING_FORM_VALUES,
  INVALID_PASSWORD_FORMAT,
} from "consts/errors";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import hasPasswordValidFormat from "utils/hasPasswordValidFormat";
import RoleModel from "models/RoleEto";

export default function UserForm({
  user,
  submit,
  roles
}: {
  user: User | null;
  submit;
  roles : RoleModel[]
}) {
  const [email, setEmail] = useState<string>(user?.accountEto?.email ?? "");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [name, setName] = useState<string>(user?.name ?? "");
  const [surname, setSurname] = useState<string>(user?.surname ?? "");
  const [error, setError] = useState<string | null>(null);
  const [roleId, setRoleId] = useState<string | null>(
    user?.roleEto?.id ?? null
  );

  const isValid = () => {
    if (
      email.trim().length < 1 ||
      name.trim().length < 1 ||
      surname.trim().length < 1 ||
      roleId === null
    ) {
      setError(MISSING_FORM_VALUES);
      return false;
    }

    if (!validateEmail(email)) {
      setError(INVALID_EMAIL);
      return false;
    }

    if (!user) {
      if (password.trim().length < 1 || repeatedPassword.trim().length < 1) {
        setError(MISSING_FORM_VALUES);
        return false;
      }

      if (password !== repeatedPassword) {
        setError(INVALID_PASSWORDS);
        return false;
      }

      if (!hasPasswordValidFormat(password)) {
        setError(INVALID_PASSWORD_FORMAT);
        return false;
      }
    }

    return true;
  };

  const handleSave = () => {
    if (isValid()) {
      setError(null);
      const newUser = {
        ...user,
        email,
        password,
        name,
        surname,
        roleId,
      };
      submit(newUser);
    }
  };

  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRoleId(event.target.value as string);
  };

  return (
    <form className="UserForm" onSubmit={handleSave}>
      <h2>{user ? "Edit user" : "Add new user"}</h2>
      <TextField
        required
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        required
        label="Surname"
        fullWidth
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <TextField
        required
        label="Email"
        fullWidth
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {!user && (
        <>
          <TextField
            required
            label="Password"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            required
            label="Repeat password"
            fullWidth
            type="password"
            value={repeatedPassword}
            onChange={(e) => setRepeatedPassword(e.target.value)}
          />
        </>
      )}
      <FormControl>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={roleId}
          onChange={handleRoleChange}
        >
       {roles
          .map((role) => (
            <MenuItem value={role.id}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
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
