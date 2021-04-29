import React from 'react';

import 'styles/Header.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

export default function Header({ title }: { title: string}) {
  return (
    <header className="Header">
      <AppBar>
        <Toolbar style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
        >
          <div className="logo">
            <IconButton>
              <MenuIcon style={{ color: '#fff' }} />
            </IconButton>
            <h1>{title}</h1>
          </div>
          <div className="links">
            <Link to="/login">
              Log in
            </Link>
            <Link to="/signup">
              Sign up
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </header>
  );
}
