import axios from 'axios';
import User from 'models/User';
import { getToken } from './authService';

export async function fetchUsers() {
  const token = getToken();
  try {
    const res = await axios({
      method: 'get',
      url: '/user/v1/users',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 204) {
      return { err: null, users: [] };
    }

    return { err: null, users: res.data };
  } catch (err) {
    console.log(err);
    return { err, users: [] };
  }
}

export async function fetchUser(userId: string) {
  const token = getToken();
  try {
    const res = await axios({
      method: 'get',
      url: `/user/v1/users/${userId}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 204) {
      return { err: null, users: [] };
    }

    return { err: null, users: res.data };
  } catch (err) {
    console.log(err);
    return { err, users: [] };
  }
}

export async function fetchUserRoles(userId: string) {
  const token = getToken();
  try {
    const res = await axios({
      method: 'get',
      url: `/user/v1/users/role/${userId}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 204) {
      return { err: null, users: [] };
    }

    return { err: null, users: res.data };
  } catch (err) {
    console.log(err);
    return { err, users: [] };
  }
}

export async function addUser(user: User) {
  const {email, password, name, surname, role} = user
  const token = getToken();
  try {
    const res = await axios({
      method: 'post',
      url: '/user/v1/user',
      headers: { Authorization: `Bearer ${token}` },
      data: {
				accountTo: {
          email: email,
          password: password,
        },
        name: name,
        roleId: role,
        surname: surname,
			}
    });
    return { err: null, user: res.data };
  } catch (err) {
    console.log(err);
    return { err, user: [] };
  }
}

export async function editUser(user: User) {
  const {email, password, name, surname, role} = user
  const token = getToken();
  try {
    const res = await axios({
      method: 'put',
      url: `/user/v1/user/${user.id}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
				accountTo: {
          email: email,
          password: password,
        },
        name: name,
        roleId: role,
        surname: surname,
			}
    });
    return { err: null, user: res.data };
  } catch (err) {
    console.log(err);
    return { err, user: [] };
  }
}

export async function removeUser(userId: string) {
  const token = getToken();
  try {
    await axios({
      method: 'delete',
      url: `/user/v1/user/${userId}`,
      headers: { Authorization: `Bearer ${token}` },
    });

		return { err: null }
  } catch (err) {
    console.log(err);
    return { err };
  }
}
