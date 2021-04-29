import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import 'styles/Login.scss';
import { login } from 'actions/auth';
import Header from 'components/Header';
import Input from 'components/Input';
import Wrapper from 'components/Wrapper';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    await login({ email, password });
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
            handleChange={setEmail}
          />
          <Input
            label="Password"
            type="password"
            handleChange={setPassword}
          />
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
