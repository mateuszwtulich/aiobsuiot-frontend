import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import 'styles/Login.scss';
import { login } from 'hooks/useAuth';
import Header from 'components/Header';
import Input from 'components/Input';
import Wrapper from 'components/Wrapper';
import { INVALID_EMAIL, MISSING_FORM_VALUES } from 'consts/errors';
import validateEmail from '../utils/validateEmail';
import ErrorMessage from './ErrorMessage';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const isValid = () => {
    if (email.trim().length < 1
		|| password.trim().length < 1) {
      setError(MISSING_FORM_VALUES);
      return false;
    }

    if (!validateEmail(email)) {
      setError(INVALID_EMAIL);
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (isValid()) {
      await login({ email, password });
    }
  };

  return (
    <div className="Login">
      <Header title="Log in" />
      <Wrapper className="content">
        <h2>Log in</h2>
        <form className="login-form">
          <Input
            label="Email"
            type="email"
            value={email}
            handleChange={setEmail}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            handleChange={setPassword}
          />
          <ErrorMessage error={error} />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleLogin}
          >
            Log in
          </Button>
        </form>
        <p>Don`t have an account?</p>
        <Link to="/signup">Sign up</Link>
      </Wrapper>
    </div>
  );
}
