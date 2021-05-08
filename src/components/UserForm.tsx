import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import 'styles/UserForm.scss';
import User from 'models/User';
import formatDate from './utils/formatDate';

export default function UserForm({ user, sumbit }:{user?: User, sumbit}) {
  const [email, setEmail] = useState<string>(user?.email ?? '');
  const [password, setPassword] = useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');
  const [name, setName] = useState<string>(user?.name ?? '');
  const [surname, setSurname] = useState<string>(user?.surname ?? '');
  const [error, setError] = useState<string | null>(null);

  const isValid = async () => {
    if (email.trim().length < 1
		|| name.trim().length < 1
		|| password.trim().length < 1
		|| repeatedPassword.trim().length < 1
		|| surname.trim().length < 1) {
      setError('missing fields');
      return false;
    }

    if (password !== repeatedPassword) {
      setError('passwords are not the same');
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (isValid()) {
      setError(null);
      const newUser = {
        email, password, repeatedPassword, name, surname,
      };
      sumbit(newUser);
    }
  };

  return (
    <form
      className="UserForm"
      onSubmit={handleSave}
    >
      <h2>{user ? 'Edit user' : 'Add new user'}</h2>
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
      <br />
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
