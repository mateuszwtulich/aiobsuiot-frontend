import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Drawer } from "@material-ui/core";
import { isLoggedIn, signOut } from "services/authService";

import "styles/Header.scss";
import DrawerContent from "./DrawerContent";

export default function Header({ title }: { title: string }) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen((open) => !open);
  };

  const isLogged = isLoggedIn();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <header className="Header">
      <AppBar>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="logo">
            <IconButton onClick={toggleDrawer}>
              <MenuIcon style={{ color: "#fff" }} />
            </IconButton>
            <h1>{title}</h1>
          </div>
          <div className="links">
            {isLogged ? (
              <button onClick={handleSignOut}>Log out</button>
            ) : (
              <>
                <Link to="/login">Log in</Link>
                <Link to="/signup">Sign up</Link>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Fragment key="left">
        {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <DrawerContent />
        </Drawer>
      </Fragment>
    </header>
  );
}
