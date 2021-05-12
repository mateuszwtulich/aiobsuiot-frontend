import axios from 'axios';
import { UNKNOWN_ERROR } from 'consts/errors';

export async function login({ user, history }) {
  try {
    const res = await axios.post('api/authenticate', user);
    const { headers } = res;
    if (!headers) {
      throw new Error(UNKNOWN_ERROR);
    }

    const { authorization } = headers;
    if (!authorization) {
      throw new Error(UNKNOWN_ERROR);
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      throw new Error(UNKNOWN_ERROR);
    }

    localStorage.setItem('TOKEN', token);
    history.push('/tasks');

    return { err: null, isLoggedIn: true };
  } catch (err) {
    console.log(err);
    return { err: err.message, isLoggedIn: false };
  }
}

export function getToken() {
  return localStorage.getItem('TOKEN');
}

export function isLoggedIn() {
  return !!getToken();
}

export function signOut(history) {
  localStorage.removeItem('TOKEN');
  history.push('/login');
}
