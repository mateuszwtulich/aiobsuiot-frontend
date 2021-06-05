import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';

import 'styles/Login.scss';
import Header from 'components/Header';
import Input from 'components/Input';
import Wrapper from 'components/Wrapper';
import { MISSING_FORM_VALUES } from 'consts/errors';
import { login } from 'services/authService';
import ErrorMessage from './ErrorMessage';
import SimpleLoader from './SimpleLoader';
import { useAuth } from 'contexts/AuthContext';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
	const {setAuthUser} = useAuth();

  const history = useHistory();

  const isValid = () => {
    if (username.trim().length < 1
		|| password.trim().length < 1) {
      setError(MISSING_FORM_VALUES);
      return false;
    }

    setError(null);
    return true;
  };

  const handleLogin = async () => {
    setLoading(true);

    if (isValid()) {
      const { err, user } = await login({ user: { username, password } });
      if (err) {
        setError(err);
      } else {
				setAuthUser(user);
			}
    }

    setLoading(false);
  };

  return (
    <div className="Login">
      <Header title="Log in" />
      <Wrapper className="content">
        <h2>Log in</h2>
        <form className="login-form">
          <Input
            label="Username"
            value={username}
            handleChange={setUsername}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            handleChange={setPassword}
          />
          <ErrorMessage error={error} />
          {isLoading ? <SimpleLoader /> : (
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleLogin}
            >
              Log in
            </Button>
          )}
        </form>
        <p>Don`t have an account?</p>
        <Link to="/signup">Sign up</Link>
      </Wrapper>
    </div>
  );
}
