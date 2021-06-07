import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import "styles/Signup.scss";
import Header from "components/Header";
import Input from "components/Input";
import Wrapper from "components/Wrapper";
import ErrorMessage from "./ErrorMessage";
import validateEmail from "../utils/validateEmail";
import hasPasswordValidFormat from "../utils/hasPasswordValidFormat";
import { signup } from "services/authService";

import {
  INVALID_EMAIL,
  INVALID_PASSWORDS,
  MISSING_FORM_VALUES,
  INVALID_PASSWORD_FORMAT,
} from "consts/errors";
import InfoDialog from "./InfoDialog";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isInfoDialogOpened, setInfoDialogOpened] = useState(false);

  const isValid = () => {
    if (
      email.trim().length < 1 ||
      password.trim().length < 1 ||
      repeatedPassword.trim().length < 1 ||
      name.trim().length < 1 ||
      surname.trim().length < 1
    ) {
      setError(MISSING_FORM_VALUES);
      return false;
    }

    if (!validateEmail(email)) {
      setError(INVALID_EMAIL);
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

    return true;
  };

  const handleSignup = async () => {
    if (isValid()) {
      setError(null);
      const { err } = await signup({ email, password, name, surname });

      if (err) {
        setError(err);
      } else {
        handleOpenInfoDialog();
      }
    }
  };

  const handleOpenInfoDialog = () => {
    setInfoDialogOpened(true);
  };

  const handleCloseInfoDialog = () => {
    setInfoDialogOpened(false);
  };

  return (
    <div className="Signup">
      <Header title="Log in" />
      <Wrapper className="content">
        <h2>Sign up</h2>
        <form className="signup-form">
          <Input label="Name" handleChange={setName} value={name} />
          <Input label="Surname" handleChange={setSurname} value={surname} />
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
          <ErrorMessage error={error} />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSignup}
          >
            Sign up
          </Button>
        </form>

        <InfoDialog
          title="Confirm your email"
          text="To finish sign up please log in to your email account and confirm email provided in form"
          isOpen={isInfoDialogOpened}
          closeInfoDialog={handleCloseInfoDialog}
        />

        <p>Already have a account?</p>
        <Link to="/login">Log in</Link>
      </Wrapper>
    </div>
  );
}
