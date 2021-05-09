import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import 'styles/Home.scss';
import Header from 'components/Header';
import Wrapper from 'components/Wrapper';

export default function Home() {
  return (
    <div className="Home">
      <Header title="Home" />
      <Wrapper className="content">
        <h2>Hi there</h2>
        <div className="buttons">
          <Button
            variant="contained"
            color="primary"
            size="large"
          >
            <Link to="/login">
              Log in
            </Link>
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
          >
            <Link to="/signup">
              Sign up
            </Link>
          </Button>
        </div>
      </Wrapper>
    </div>
  );
}
