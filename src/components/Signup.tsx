import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import 'styles/Signup.scss';
import { signup } from 'hooks/useAuth';
import Header from 'components/Header';
import Input from 'components/Input';
import Wrapper from 'components/Wrapper';

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const isValid = async () => {
    if (email.trim().length < 1
		|| password.trim().length < 1
		|| repeatedPassword.trim().length < 1
		|| name.trim().length < 1
		|| surname.trim().length < 1) {
      setError('missing fileds');
      return false;
    }

    if (password !== repeatedPassword) {
      setError('passwords are not the same');
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (isValid()) {
      setError(null);
      await signup({ email, password, repeatedPassword });
    }
  };

  return (
    <div className="Signup">
      <Header title="Log in" />
      <Wrapper className="content">
        <h2>Sign up</h2>
        <form className="signup-form">
          <Input
            label="Name"
            handleChange={setName}
            value={name}
          />
          <Input
            label="Surname"
            handleChange={setSurname}
            value={surname}
          />
          <Input
            label="Email"
            type="email"
            handleChange={setEmail}
            value={email}
          />
          <Input
            label="Password"
            type="password"
            handleChange={setPassword}
            value={password}
          />
          <Input
            label="Repeat password"
            type="password"
            handleChange={setRepeatedPassword}
            value={repeatedPassword}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSignup}
          >
            Sign up
          </Button>
        </form>
        <p>Already have a account?</p>
        <Link to="/login">Log in</Link>
      </Wrapper>
    </div>
  );
}
