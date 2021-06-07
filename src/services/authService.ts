import axios from "axios";
import jwt_decode from "jwt-decode";

import { INVALID_CREDENTIALS, UNKNOWN_ERROR } from "consts/errors";
import { AuthUserType } from "contexts/AuthContext";

export async function login({ user }) {
  try {
    const res = await axios.post("api/authenticate", user);

    if (res.status === 403) {
      throw new Error(UNKNOWN_ERROR);
    }

    const { headers } = res;
    if (!headers) {
      throw new Error(UNKNOWN_ERROR);
    }

    const { authorization } = headers;
    if (!authorization) {
      throw new Error(UNKNOWN_ERROR);
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      throw new Error(UNKNOWN_ERROR);
    }

    storeToken(token);
    const decodedUser = decodeUserFromToken(token);

    return { err: null, user: decodedUser };
  } catch (err) {
    if (err.response && err.response.status === 403) {
      return { err: INVALID_CREDENTIALS, user: null };
    }

    return { err: err.message, user: null };
  }
}

export async function signup(user) {
  const { email, name, surname, password } = user;
  try {
    await axios.post("user/v1/user/signup", {
      email,
      name,
      surname,
      password,
    });

    return { err: null, user: null };
  } catch (err) {
    return { err: err.message, user: null };
  }
}

export function decodeUserFromToken(token: string | null) {
  if (token === null) {
    return null;
  }

  const decoded: AuthUserType = jwt_decode(token);

  const { userId, authorities } = decoded;

  return { userId, authorities };
}

export function storeToken(token: string) {
  localStorage.setItem("TOKEN", token);
}

export function getToken() {
  const token = localStorage.getItem("TOKEN");

  if (token === null || (jwt_decode(token) as any).exp < Date.now() / 1000) {
    localStorage.clear();
    return null;
  }
  return token;
}

export function isLoggedIn() {
  return !!getToken();
}

export function signOut() {
  localStorage.removeItem("TOKEN");
  window.location.reload();
}
